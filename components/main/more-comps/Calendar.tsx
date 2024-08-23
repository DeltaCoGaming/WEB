// components/main/more-comps/Calendar.tsx

// TODO: make the calendar action - text color white - remove attendees - add emoji api

'use client'

import React, { useState, useEffect } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown, MessageSquare, ThumbsUp } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function Component() {
  const [date, setDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [expandedEvent, setExpandedEvent] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      const formattedDate = format(date, "yyyy-MM-dd")
      try {
        const response = await fetch(`http://0.0.0.0:55003/v2/web/events/events/${formattedDate}`)
        const data = await response.json()
        setEvents(data || [])
      } catch (error) {
        console.error("Error fetching events:", error)
      }
    }
    fetchEvents()
  }, [date])

  const handleReaction = async (eventId, emoji) => {
    console.log(`Reacted with ${emoji} to event ${eventId}`)
    // Here you would make an API call to update the reactions
  }

  const handleComment = async (eventId, comment) => {
    try {
      await fetch(`http://0.0.0.0:55003/v2/web/events/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ event_id: eventId, comment }),
      })
      console.log(`Commented "${comment}" on event ${eventId}`)
    } catch (error) {
      console.error("Error posting comment:", error)
    }
  }

  return (
    <div className="bg-black text-white min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#d6c8a6]">
          Gaming Events
        </h2>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal mb-8 bg-[#1a1a1a] border-[#d6c8a6] text-[#d6c8a6]"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-[#1a1a1a] border-[#d6c8a6]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-[#d6c8a6]"
            />
          </PopoverContent>
        </Popover>

        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-[#1a1a1a] rounded-lg p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xl font-semibold text-[#d6c8a6]">{event.title}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    className="text-[#d6c8a6]"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform ${expandedEvent === event.id ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${event.host}`} />
                    <AvatarFallback>{event.host[0]}</AvatarFallback>
                  </Avatar>
                  <span>{event.host} • {event.time} • {event.attendees} attendees</span>
                </div>
                {expandedEvent === event.id && (
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {['👍', '🎮', '🏆', '😄', '🔥'].map((emoji) => (
                        <Button
                          key={emoji}
                          variant="outline"
                          size="sm"
                          onClick={() => handleReaction(event.id, emoji)}
                          className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] border-none"
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        placeholder="Add a comment..."
                        className="bg-[#2a2a2a] text-white border-none flex-grow"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleComment(event.id, e.target.value)
                            e.target.value = ''
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        className="bg-[#2a2a2a] text-white hover:bg-[#3a3a3a] border-none"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-[#1a1a1a] rounded-lg">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-xl text-gray-400">No events scheduled for this date.</p>
            <p className="text-sm text-gray-500 mt-2">Try selecting a different date.</p>
          </div>
        )}
      </div>
    </div>
  )
}