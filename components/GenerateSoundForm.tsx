"use client";

// Import necessary modules and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import SOUND_MODELS, { SoundModel } from "@/lib/constants";
import { CreateSoundRequest } from "@/components/Generate/GenerateSoundView";

// Define the validation schema for the form fields
const FormSchema = z.object({
  soundModel: z.string({
    required_error: "Please select a Hugging Face sound model to use.",
  }),
  text: z.string({
    required_error: "Please select a text for the model to use.",
  }),
});

// Define the props interface for the GenerateSoundForm component
interface GenerateSoundFormProps {
  handleGetAudio: (data: CreateSoundRequest) => void;
}

// Main component function
export function GenerateSoundForm({ handleGetAudio }: GenerateSoundFormProps) {
  // State for tracking form submission status
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  // Initialize the react-hook-form with the validation schema
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  function onSubmit(data: z.infer<typeof FormSchema>) {
    setFormSubmitting(true);

    // Prepare the sound request object
    const soundRequest: CreateSoundRequest = {
      modelUrl: data.soundModel,
      text: data.text,
    };

    // Call the provided handler function with the sound request
    handleGetAudio(soundRequest);

    setFormSubmitting(false);
  }

  return (
    <div className="ml-8 mr-8 ">
      {/* Form component that uses react-hook-form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Form field for selecting the sound model */}
          <FormField
            control={form.control}
            name="soundModel"
            render={({ field }) => (
              <FormItem>
                <span className="text-xl font-semibold">Sound Model</span>
                {/* Select component for choosing a sound model */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={formSubmitting}
                >
                  <FormControl className="text-md  flex text-left py-7 rounded-md">
                    <SelectTrigger>
                      <SelectValue placeholder="Select your voice model from here" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Map through available sound models */}
                    {SOUND_MODELS.map((model: SoundModel, index: number) => (
                      <SelectItem
                        key={`${model.name}-${index}`}
                        value={model.url}
                      >
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Form field for entering the text */}
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <span className="text-xl font-semibold">Text</span>
                <FormControl>
                  {/* Textarea component for entering text */}
                  <Textarea
                    disabled={formSubmitting}
                    rows={6}
                    placeholder="Enter your text here..."
                    {...field}
                    className="border border-gray-400"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* Submit button */}

          <div className="pt-6">
            <Button
              type="submit"
              disabled={formSubmitting}
              className="w-full h-14 text-xl rounded-xl text-white bg-slate-800 tracking-wide"
            >
              Generate Audio
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
