import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {  supportSchema, type SupportFormValues } from "../schemas/AppointmentSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useCreateSupport } from "../hooks/useCreateSupport";
import { toast } from "sonner";

interface IProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    bookingId: string;
}

const SupportDialog = ({
  open,
  onOpenChange,
  bookingId,
}: IProps) => {
  const supportMutation = useCreateSupport();

  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });
   
  const onSubmit = (data: SupportFormValues) => {
    supportMutation.mutate(
      {
        bookingId,
        subject: data.subject,
        message: data.message,
      },
      {
        onSuccess: () => {
            toast.success('Support ticket created successfully')
          form.reset();
          onOpenChange(false);
        },
      },
      
    );
  };

    return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Contact Support</DialogTitle>

          <DialogDescription>
            Tell us how we can help you with your appointment.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Subject */}
          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium"
            >
              Subject
            </label>

            <Input
              id="subject"
              placeholder="Enter subject"
              {...form.register("subject")}
              disabled={supportMutation.isPending}
            />

            {form.formState.errors.subject && (
              <p className="text-sm text-app-error">
                {form.formState.errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium"
            >
              Message
            </label>

            <Textarea
              id="message"
              placeholder="Write your message..."
              rows={5}
              {...form.register("message")}
              disabled={supportMutation.isPending}
            />

            {form.formState.errors.message && (
              <p className="text-sm text-app-error">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={supportMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="bg-app-main text-white"
              disabled={supportMutation.isPending}
            >
              {supportMutation.isPending
                ? "Sending..."
                : "Send to Support"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SupportDialog;