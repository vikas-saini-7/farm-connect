'use client'

import { useState } from 'react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns'
import { motion } from 'framer-motion'

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [notes, setNotes] = useState<Record<string, string>>({})

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-2">
      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="text-sm px-2 py-1 bg-green-200 rounded">
        &lt;
      </button>
      <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="text-sm px-2 py-1 bg-green-200 rounded">
        &gt;
      </button>
    </div>
  )

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return (
      <div className="grid grid-cols-7 gap-1 text-xs text-center text-gray-600 mb-1">
        {days.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>
    )
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const rows = []
    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'yyyy-MM-dd')
        days.push(
          <div
            key={day.toString()}
            className={`h-20 p-1 border text-xs rounded-md cursor-pointer transition hover:bg-green-100
              ${!isSameMonth(day, currentMonth) ? 'text-gray-300' : ''}
              ${isSameDay(day, selectedDate) ? 'bg-green-300 text-white' : ''}`}
            onClick={() => setSelectedDate(day)}
          >
            <div className="font-semibold">{format(day, 'd')}</div>
            <div className="truncate text-[10px] text-gray-600">{notes[formattedDate]}</div>
          </div>
        )
        day = addDays(day, 1)
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-1 mb-1">
          {days}
        </div>
      )
      days = []
    }

    return <div>{rows}</div>
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const formatted = format(selectedDate, 'yyyy-MM-dd')
    setNotes({ ...notes, [formatted]: e.target.value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto mt-6 bg-white p-4 shadow-lg rounded-xl"
    >
      <h1 className="text-xl font-bold mb-2 text-green-700 text-center">🌿 Crop Calendar</h1>
      <p className="text-sm text-center text-gray-500 mb-4">
        Today: <span className="font-medium">{format(new Date(), 'eeee, MMMM d')}</span>
      </p>

      {renderHeader()}
      {renderDays()}
      {renderCells()}

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-1 text-gray-700">
          Notes for {format(selectedDate, 'MMM d, yyyy')}
        </h3>
        <textarea
          rows={3}
          value={notes[format(selectedDate, 'yyyy-MM-dd')] || ''}
          onChange={handleNoteChange}
          placeholder="e.g., Start planting tomatoes..."
          className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
    </motion.div>
  )
}
