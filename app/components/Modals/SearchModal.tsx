"use client";
import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useParams, useRouter } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Inputs/Calendar";
import Counter from "../Inputs/Counter";

enum Steps {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const params = useParams();
  const searchModal = useSearchModal();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [steps, setSteps] = useState(Steps.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setSteps((prev) => prev - 1);
  }, []);
  const onNext = useCallback(() => {
    setSteps((prev) => prev + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (steps !== Steps.INFO) {
      return onNext();
    }
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }
    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipEmptyString: true, skipNull: true }
    );

    setSteps(Steps.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    steps,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    params,
    onNext,
    router,
    searchModal,
  ]);

  const actionLabel = useMemo(() => {
    if (steps === Steps.INFO) {
      return "Search";
    }
    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === Steps.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [steps]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where are you going?"
        subtitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => {
          setLocation(value as CountrySelectValue);
        }}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (steps === Steps.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When are you going?"
          subtitle="Find the perfect time!"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => {
            setDateRange(value.selection);
          }}
        />
      </div>
    );
  }

    if (steps === Steps.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="More Information"
              subtitle="Find the perfect place!"
            />
            <Counter
              title="Guests"
              subtitle="How many guests are coming?"
              value={guestCount}
              onChange={(value) => {
                setGuestCount(value);
              }}
            />
            <Counter
              title="Rooms"
              subtitle="How many rooms do you need?"
              value={roomCount}
              onChange={(value) => {
                setRoomCount(value);
              }}
            />
            <Counter
              title="Bathrooms"
              subtitle="How many bathrooms are needed?"
              value={bathroomCount}
              onChange={(value) => {
                setBathroomCount(value);
              }}
            />
          </div>
        );
    }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === Steps.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
