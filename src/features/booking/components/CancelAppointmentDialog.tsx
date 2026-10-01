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
            <DialogContent className="sm:max-w-122.5 rounded-2xl p-6 sm:p-8">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-xl font-semibold text-[#1F2933]">Cancel Appointment</DialogTitle>

                    <DialogDescription className="max-w-md text-sm text-content-muted">
                        Are you sure you want to cancel this appointment?
                        please provide a reason so we can better understand your request. 
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label
                            htmlFor="cancel_reason"
                            className="text-sm font-medium text-[#374151]"
                        >
                            Cancellation reason 
                            <span className="ml-1 text-app-error">*</span>
                        </label>

                        <Textarea
                            id="cancel_reason"
                            placeholder="Tell us why you want to cancel..."
                            {...form.register("cancel_reason")}
                            disabled={cancelMutation.isPending}
                            className="min-h-28 resize-none rounded-xl border-[#D7D7CE1] bg-white px-4 py-3 text-sm shadow-none"
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