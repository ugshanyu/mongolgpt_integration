// components/ScheduleForm.js
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const WEEKDAYS_MN = {
  0: "Даваа",
  1: "Мягмар",
  2: "Лхагва",
  3: "Пүрэв",
  4: "Баасан",
  5: "Бямба",
  6: "Ням"
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ScheduleForm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Generate available days code remains the same...
  const availableDays = [];
  let currentDate = dayjs();
  let daysNeeded = 5;

  while (availableDays.length < daysNeeded) {
    if (currentDate.day() < 5) {
      availableDays.push({
        date: currentDate.format('YYYY-MM-DD'),
        weekday: WEEKDAYS_MN[currentDate.day()]
      });
    }
    currentDate = currentDate.add(1, 'day');
  }

  const handleDateChange = async (selectedDate) => {
    setDate(selectedDate);
    setTime('');
    
    try {
      const response = await fetch(`${API_BASE_URL}/ontime/get-available-slots/${selectedDate}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setAvailableSlots(data.available_slots);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Алдаа гарлаа');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/ontime/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date,
          time,
          phone,
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setIsSuccess(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="mb-6">
          <svg 
            className="mx-auto h-16 w-16 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Амжилттай захиалагдлаа
        </h2>
        <p className="text-gray-600 mb-8">
          Таны сургалтын цаг амжилттай захиалагдлаа.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Сургалтын цаг захиалах</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Өдөр сонгох
          </label>
          <select
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            required
          >
            <option value="" className="text-gray-500">Өдөр сонгоно уу</option>
            {availableDays.map((day) => (
              <option key={day.date} value={day.date} className="text-gray-700">
                {day.weekday} - {day.date}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Цаг сонгох
          </label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors disabled:bg-gray-100"
            required
            disabled={!date}
          >
            <option value="" className="text-gray-500">Цаг сонгоно уу</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot} className="text-gray-700">
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">
            Утасны дугаар
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 8))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            placeholder="99887766"
            pattern="[0-9]{8}"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-4 text-white rounded-lg font-semibold text-lg transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {loading ? 'Илгээж байна...' : 'Захиалах'}
        </button>
      </form>
    </div>
  );
}