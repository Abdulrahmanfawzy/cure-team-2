const AppointmentPageSkelton = () => {
    return (
        <div className="w-full animate-pulse flex">

            <div className="block w-full lg:flex-1 m-9">

                <div className="h-8 w-68 bg-gray-200 rounded-[19px]" />


                <div className="h-75   bg-background-neutral-lightest w-full font-montserrat rounded-[19px]    p-4 mt-4" >
                    {/* Days */}
                    <div className="mt-5 flex gap-2">


                        <div className="grid flex-1 grid-cols-7 gap-2">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-15 rounded-md bg-gray-200"
                                />
                            ))}
                        </div>
                    </div>
                    {/* Time slots */}
                    <div className="mt-6">
                        <div className="mb-3 h-5 w-24 rounded bg-gray-200" />

                        <div className="grid grid-cols-3 gap-3">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-10 rounded-xl bg-gray-200"
                                />
                            ))}
                        </div>
                    </div>



                </div>





                {/* Footer */}
                {/* <div className="mt-6 flex items-center justify-between">
                    <div className="h-5 w-24 rounded bg-gray-200" />
                    <div className="h-10 w-32 rounded-md bg-gray-200" />
                </div> */}
            </div>

            <div className="hidden sm:block w-full max-w-115 rounded-4xl  m-9 bg-background-neutral-lightest px-4 pb-6 pt-8 lg:shrink-0">

                {/* Doctor Header */}
                <div className="flex flex-col items-center gap-4">
                    {/* Image */}
                    <div className="h-28 w-28 rounded-full bg-gray-200" />

                    {/* Name */}
                    <div className="h-5 w-40 rounded bg-gray-200" />

                    {/* Specialty */}
                    <div className="h-4 w-28 rounded bg-gray-200" />
                </div>
                {/* states */}
                <div className="grid grid-cols-4 items-start mt-7">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-2"
                        >
                            <div className="h-14 w-14 rounded-full bg-gray-200" />
                            <div className="h-4 w-10 rounded bg-gray-200" />
                            <div className="h-3 w-14 rounded bg-gray-200" />
                        </div>
                    ))}
                </div>
                {/* About */}
                <div className="mt-6 flex flex-col gap-3 p-4">
                    <div className="h-6 w-24 rounded bg-gray-200" />
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-5/6 rounded bg-gray-200" />
                </div>
                {/* Location */}
                <div className="flex flex-col gap-3 p-4">
                    <div className="h-6 w-24 rounded bg-gray-200" />

                    <div className="h-45 w-full rounded-2xl bg-gray-200" />
                </div>












            </div>
        </div>
    );
};

export default AppointmentPageSkelton;