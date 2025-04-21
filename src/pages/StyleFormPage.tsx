
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z.object({
  skinTone: z.string().min(2, {
    message: "Please select a skin tone.",
  }),
  hairColor: z.string().min(2, {
    message: "Please select a hair color.",
  }),
  bodyType: z.string().min(2, {
    message: "Please select a body type.",
  }),
  height: z.string().min(2, {
    message: "Please enter your height.",
  }),
  gender: z.string().min(2, {
    message: "Please select a gender.",
  }),
  occasion: z.string().min(2, {
    message: "Please select an occasion.",
  }),
  additionalInfo: z.string().optional(),
});

type StyleFormValues = z.infer<typeof formSchema>;

const StyleFormPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StyleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skinTone: "",
      hairColor: "",
      bodyType: "",
      height: "",
      gender: "",
      occasion: "",
      additionalInfo: "",
    },
  });

  const onSubmit = async (data: StyleFormValues) => {
    setIsSubmitting(true);
    try {
      // In a real implementation, we would send this data to the Gemini API
      // For now, we'll just simulate a delay and redirect to the results page
      console.log("Form data:", data);
      
      localStorage.setItem("styleFormData", JSON.stringify(data));
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigate("/results");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-fashion-purple-light py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/" className="inline-flex items-center text-fashion-purple-medium hover:text-fashion-purple-dark mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>
        
        <Card className="bg-white shadow-xl border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-heading font-bold text-fashion-purple-dark">Your Style Profile</CardTitle>
            <CardDescription className="text-lg mt-2">
              Tell us about yourself so we can create the perfect outfit recommendation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="skinTone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skin Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your skin tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="very-fair">Very Fair</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="olive">Olive</SelectItem>
                            <SelectItem value="tan">Tan</SelectItem>
                            <SelectItem value="deep">Deep</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the option closest to your natural skin color
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hairColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hair Color</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your hair color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="black">Black</SelectItem>
                            <SelectItem value="dark-brown">Dark Brown</SelectItem>
                            <SelectItem value="medium-brown">Medium Brown</SelectItem>
                            <SelectItem value="light-brown">Light Brown</SelectItem>
                            <SelectItem value="blonde">Blonde</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="gray-silver">Gray/Silver</SelectItem>
                            <SelectItem value="other">Other (colored/multiple tones)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bodyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Body Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your body type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="rectangle">Rectangle (balanced shoulders & hips)</SelectItem>
                            <SelectItem value="triangle">Triangle (wider hips than shoulders)</SelectItem>
                            <SelectItem value="inverted-triangle">Inverted Triangle (wider shoulders than hips)</SelectItem>
                            <SelectItem value="hourglass">Hourglass (defined waist, balanced shoulders & hips)</SelectItem>
                            <SelectItem value="round">Round (fuller mid-section)</SelectItem>
                            <SelectItem value="athletic">Athletic (muscular build)</SelectItem>
                            <SelectItem value="petite">Petite (smaller frame overall)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your height range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="under-5-0">Under 5'0" (152cm)</SelectItem>
                            <SelectItem value="5-0-to-5-3">5'0" - 5'3" (152-160cm)</SelectItem>
                            <SelectItem value="5-4-to-5-7">5'4" - 5'7" (161-170cm)</SelectItem>
                            <SelectItem value="5-8-to-5-11">5'8" - 5'11" (171-180cm)</SelectItem>
                            <SelectItem value="6-0-to-6-3">6'0" - 6'3" (181-190cm)</SelectItem>
                            <SelectItem value="over-6-3">Over 6'3" (190cm+)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="non-binary">Non-binary</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="occasion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Occasion</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select the occasion" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="casual">Casual Day Out</SelectItem>
                            <SelectItem value="work">Work/Office</SelectItem>
                            <SelectItem value="formal">Formal Event</SelectItem>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="date">Date Night</SelectItem>
                            <SelectItem value="party">Party</SelectItem>
                            <SelectItem value="workout">Workout/Athletic</SelectItem>
                            <SelectItem value="beach">Beach/Vacation</SelectItem>
                            <SelectItem value="interview">Interview</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your style preferences, colors you like/dislike, or anything else that might help..."
                          className="resize-none h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Add any specific preferences or details you'd like us to consider
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-center pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-fashion-purple hover:bg-fashion-purple-medium text-white px-8 py-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Generating your style..." : "Get Your Style Recommendation"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StyleFormPage;
