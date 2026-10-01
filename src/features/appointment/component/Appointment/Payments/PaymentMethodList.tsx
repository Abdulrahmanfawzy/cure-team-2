import type { PaymentMethod } from "@/features/appointment/types/paymentMethods.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaymentMethodCard from "./PaymentMethodCard";

interface IProps {
  methods: PaymentMethod[];
  selectedMethodId?: string;
  onSelect: (id: string) => void;
}

const PaymentMethodList = ({
  methods,
  selectedMethodId,
  onSelect,
}: IProps) => {
  if (methods.length === 0) {
    return (
      <div className="mt-5 rounded-lg border border-dashed border-[#145DB8] bg-[#F7FAFF] p-4 text-center text-sm text-[#145DB8]">
        No saved payment methods yet.
      </div>
    );
  }

  return (
    <ScrollArea className="h-48 pr-1">
      <div className="space-y-3 py-1">
        {methods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            isSelected={selectedMethodId === method.id}
            onSelect={() => onSelect(method.id)}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default PaymentMethodList;