'use client';

import styled from '@emotion/styled';
import { Typography, Card, CardContent } from '@mui/material';
import {
  eachDayOfInterval,
  format,
  parseISO,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  getDay,
} from 'date-fns';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BasicButton, Loading } from '@/components/layouts';
import { Settings } from '@/config';
import { useAuth } from '@/contexts/auth';
import useFetchData from '@/lib/useFetchData';
import { ActivityRecord, DefeatedRecordsData } from '@/types';

const StyledCard = styled(Card)`
  background-color: rgba(30, 58, 138, 0.8);
  border: 3px solid #c0c0c0;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  color: white;
  padding: 16px;
  margin-top: 24px;
`;

export default function DailyHuntLog() {
  const { googleUserId } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activityLog, setActivityLog] = useState<ActivityRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const defeatedData = useFetchData<DefeatedRecordsData>(
    googleUserId
      ? `${Settings.API_URL}/api/v1/user_quests/defeated_records/${googleUserId}`
      : '',
  );

  useEffect(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const monthDays = eachDayOfInterval({ start, end });

    const firstDayOfWeek = getDay(start);
    const emptyDays = Array(firstDayOfWeek).fill(null);

    const logData = monthDays.map((date) => {
      const dateString = format(date, 'yyyy-MM-dd');
      const defeated =
        defeatedData?.defeated_at?.some((record) =>
          record.startsWith(dateString),
        ) || false;
      return { date: dateString, defeated };
    });

    setActivityLog([...emptyDays, ...logData]);
    setIsLoading(false);
  }, [currentMonth, defeatedData]);

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="absolute left-1/2 top-16 z-10 mt-2 -translate-x-1/2 text-4xl font-bold text-white">
        <p
          className="mt-2 min-w-[300px] rounded-md bg-black/50 p-4 text-center text-2xl sm:mb-2 sm:text-2xl md:text-5xl"
          style={{ whiteSpace: 'nowrap' }}
        >
          月別の活動履歴
        </p>
      </div>
      <StyledCard>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginBottom: '16px',
              borderBottom: '2px solid #ccc',
              paddingBottom: '8px',
            }}
          >
            {format(currentMonth, 'yyyy年M月の活動履歴')}
          </Typography>
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center font-bold text-white">
                {day}
              </div>
            ))}
            {activityLog.map((record, index) => (
              <div
                key={index}
                className="flex size-10 items-center justify-center rounded-md"
                style={{
                  backgroundColor:
                    record && record.defeated ? '#1E3A8A' : '#f0f0f0',
                  color: record && record.defeated ? 'white' : 'black',
                  border: '2px solid #ccc',
                }}
              >
                {record ? (
                  record.defeated ? (
                    <Image
                      src="/images/favicon/favicon.png"
                      alt="Activity Stamp"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <span className="text-sm">
                      {format(parseISO(record.date), 'd')}
                    </span>
                  )
                ) : (
                  <span></span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-nowrap justify-between space-x-4">
            <BasicButton
              text="◀︎前の月"
              onClick={goToPreviousMonth}
              style={{ padding: '6px 12px', fontSize: '14px' }}
            />

            <BasicButton
              text="次の月▶︎"
              onClick={goToNextMonth}
              style={{ padding: '6px 12px', fontSize: '14px' }}
            />
          </div>
        </CardContent>
      </StyledCard>
    </div>
  );
}
