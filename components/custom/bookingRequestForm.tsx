import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Room } from "./home/rooms";
import { useRouter } from "next/navigation";
import Script from "next/script";

// Declare global grecaptcha type
declare global {
  interface Window {
    grecaptcha:
      | {
          ready: (callback: () => void) => void;
          execute: (
            siteKey: string,
            options: { action: string }
          ) => Promise<string>;
        }
      | undefined;
  }
}

interface BookingRequestFormProps {
  onSubmit: (data: z.infer<typeof bookingFormSchema>) => void;
  onCancel: () => void;
  room: Room;
}

export const bookingFormSchema = z
  .object({
    fullName: z.string().min(1, {
      message: "Full name is required",
    }),
    email: z.string().email({
      message: "Invalid email address",
    }),
    phone: z.string().min(1, {
      message: "Phone number is required",
    }),
    checkInDate: z.date({
      required_error: "Check-in date is required",
    }),
    checkOutDate: z.date({
      required_error: "Check-out date is required",
    }),
    numberOfGuests: z.number().min(1, {
      message: "Number of guests is required",
    }),
    numberOfChildren: z.number().min(0, {
      message: "Number of children is required",
    }),
    room: z.string(),
    website: z.string().max(0, "This field should remain empty").optional(),
    recaptchaToken: z.string().optional(),
  })
  .refine(
    (data) => {
      return data.checkOutDate > data.checkInDate;
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOutDate"], // This shows the error on the checkOutDate field
    }
  );

// Replace with your actual reCAPTCHA site key
const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "YOUR_RECAPTCHA_SITE_KEY";

const BookingRequestForm = ({
  onSubmit,
  onCancel,
  room,
}: BookingRequestFormProps) => {
  const router = useRouter();
  const [checkInOpen, setCheckInOpen] = React.useState(false);
  const [checkOutOpen, setCheckOutOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  // Add a timeout to detect if reCAPTCHA fails to load
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!recaptchaLoaded && process.env.NODE_ENV === "production") {
        setRecaptchaError(
          "reCAPTCHA failed to load. This might be due to an ad blocker or network issue."
        );
      }
    }, 5000); // 5 seconds timeout

    return () => clearTimeout(timeoutId);
  }, [recaptchaLoaded]);

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      checkInDate: undefined,
      checkOutDate: undefined,
      numberOfGuests: 0,
      numberOfChildren: 0,
      room: room.name,
      website: "",
      recaptchaToken: "",
    },
  });

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  // Handle reCAPTCHA script load
  const handleRecaptchaLoad = () => {
    setRecaptchaLoaded(true);
    setRecaptchaError(null);
  };

  // Get reCAPTCHA token
  const getRecaptchaToken = async (): Promise<string> => {
    if (!recaptchaLoaded || !window.grecaptcha) {
      console.warn("reCAPTCHA not loaded properly");
      // Return empty string in development to allow form submission
      if (process.env.NODE_ENV !== "production") {
        return "";
      }
      throw new Error(
        "reCAPTCHA not loaded. Please refresh the page and try again."
      );
    }

    try {
      // Make sure grecaptcha is ready
      return new Promise((resolve, reject) => {
        window.grecaptcha?.ready(async () => {
          try {
            if (!window.grecaptcha) {
              reject(new Error("reCAPTCHA not available"));
              return;
            }

            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
              action: "booking_submit",
            });
            resolve(token);
          } catch (error) {
            console.error("reCAPTCHA execution error:", error);
            reject(
              new Error("Failed to verify you are human. Please try again.")
            );
          }
        });
      });
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      throw new Error("Failed to verify you are human. Please try again.");
    }
  };

  const onSubmitForm = async (data: z.infer<typeof bookingFormSchema>) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const now = Date.now();
      if (now - lastSubmitTime < 10000) {
        throw new Error("Please wait a moment before submitting again");
      }
      setLastSubmitTime(now);

      if (data.website && data.website.length > 0) {
        console.log("Potential bot submission detected");
        setSuccess(true);
        setTimeout(() => {
          router.push("/book/success");
        }, 1000);
        return;
      }

      // Get reCAPTCHA token with better error handling
      let recaptchaToken = "";
      try {
        recaptchaToken = await getRecaptchaToken();
      } catch (recaptchaError) {
        // In development, continue without a valid token
        if (process.env.NODE_ENV !== "production") {
          console.warn("reCAPTCHA error in development mode:", recaptchaError);
        } else {
          throw recaptchaError;
        }
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          recaptchaToken,
          checkInDate: format(data.checkInDate, "yyyy-MM-dd"),
          checkOutDate: format(data.checkOutDate, "yyyy-MM-dd"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setSuccess(true);
      await onSubmit(data);
      router.push("/book/success");
    } catch (error) {
      console.error("Error sending email:", error);
      setError(error instanceof Error ? error.message : "Failed to send email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Load reCAPTCHA script with error handling */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
        onLoad={handleRecaptchaLoad}
        onError={(e) => {
          console.error("reCAPTCHA script failed to load:", e);
          setRecaptchaError(
            "reCAPTCHA failed to load. This might be due to an ad blocker or network issue."
          );
          // Still set as loaded in dev environment to prevent blocking form submission
          if (process.env.NODE_ENV !== "production") {
            setRecaptchaLoaded(true);
          }
        }}
        strategy="lazyOnload"
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitForm)}
          className="space-y-6 font-cinzel-decorative text-primary-800"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
              {error}
            </div>
          )}
          {recaptchaError && process.env.NODE_ENV === "production" && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded">
              {recaptchaError} Please try refreshing the page.
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-600 p-3 rounded">
              Booking request sent successfully!
            </div>
          )}

          <input type="hidden" name="room" value={room.name} />
          <input
            type="hidden"
            name="checkInDate"
            value={
              form.getValues("checkInDate")
                ? format(form.getValues("checkInDate"), "yyyy-MM-dd")
                : ""
            }
          />
          <input
            type="hidden"
            name="checkOutDate"
            value={
              form.getValues("checkOutDate")
                ? format(form.getValues("checkOutDate"), "yyyy-MM-dd")
                : ""
            }
          />

          <div style={{ display: "none" }}>
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkInDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check-in Date</FormLabel>
                <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setCheckInOpen(false);
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="checkOutDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Check-out Date</FormLabel>
                <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={`w-full pl-3 text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        setCheckOutOpen(false);
                      }}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Guests</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfChildren"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Children</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1 font-cinzel-decorative"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="flex-1 bg-primary-500 text-white font-cinzel-decorative"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default BookingRequestForm;
