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
import { useCancelBooking } from "../hooks/useCancelBooking";
import { cancelAppointmentSchema, type CancelAppointmentFormValues } from "../schemas/AppointmentSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface IProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    bookingId: string;
}

const CancelAppointmentDialog = ({ open, onOpenChange, bookingId, }: IProps) => {
    const cancelMutation = useCancelBooking();
    const form = useForm<CancelAppointmentFormValues>({
        resolver: zodResolver(cancelAppointmentSchema),
        defaultValues: {
            cancel_reason: "",
        },
    });
    const onSubmit = (data: CancelAppointmentFormValues) => {
        cancelMutation.mutate(
            {
                bookingId,
                cancel_reason: data.cancel_reason,
            },
            {
                onSuccess: () => {
                    form.reset();
                    onOpenChange(false);
                },
            }
        );
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-122.5">
                <DialogHeader>
                    <DialogTitle>Cancel Appointment</DialogTitle>

                    <DialogDescription>
                        Are you sure you want to cancel this appointment?
                        You can must provide a reason.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="cancel_reason"
                            className="text-sm font-medium"
                        >
                            Cancellation reason
                        </label>

                        <Textarea
                            id="cancel_reason"
                            placeholder="Tell us why you want to cancel..."
                            {...form.register("cancel_reason")}
                            disabled={cancelMutation.isPending}
                        />

                        {form.formState.errors.cancel_reason && (
                            <p className="text-sm text-error">
                                {form.formState.errors.cancel_reason.message}
                            </p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={cancelMutation.isPending}
                        >
                            Keep Appointment
                        </Button>

                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={cancelMutation.isPending}
                        >
                            {cancelMutation.isPending
                                ? "Cancelling..."
                                : "Cancel Appointment"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );

};

export default CancelAppointmentDialog;