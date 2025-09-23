"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { JSX } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const contactFormSchema = z.object({
  fullName: z.string().min(1, {
    message: "Full name is required",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required",
  }),
  message: z.string().min(1, {
    message: "Message is required",
  }),
});

const ContactForm = (): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    // Let Formspree handle the submission
    setTimeout(() => {
      form.reset();
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Form {...form}>
      <form
        action="https://formspree.io/f/xwpvwrgb"
        method="POST"
        onSubmit={(e) => {
          const isValid = form.trigger();
          if (!isValid) {
            e.preventDefault();
          } else {
            onSubmit();
          }
        }}
        className="space-y-3 font-cinzel-decorative text-primary-800"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="default"
          className="bg-primary-500 text-white font-cinzel-decorative"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
