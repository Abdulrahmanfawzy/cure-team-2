interface IProps {
  address: string;
  latitude: number;
  longitude: number;
}

const DoctorLocation = ({
  address,
  latitude,
  longitude,
}: IProps) => {
  return (
    <section className="flex flex-col gap-3 p-4">
      <h2 className="text-[20px] text-text-secondary-default">
        Location
      </h2>

      {/* Map */}
      <div className="relative h-45 w-full overflow-hidden rounded-2xl">
        <iframe
          title="Doctor location"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
          className="h-full w-full border-0"
          loading="lazy"
        />

        <p className="absolute bottom-2 left-2  rounded bg-white px-3 py-2 text-xs leading-[150%] text-black shadow-sm sm:text-[13px]">
          {address}
        </p>
      </div>
    </section>
  );
};

export default DoctorLocation;