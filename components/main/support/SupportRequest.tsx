'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, Send, HelpCircle, X } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SupportRequest {
  discord_name: string
  reason: string
  priority: string
  email: string
}

export default function Component() {
  const [isOpen, setIsOpen] = useState(false)
  const [request, setRequest] = useState<SupportRequest>({
    discord_name: '',
    reason: '',
    priority: '',
    email: ''
  })
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRequest(prev => ({ ...prev, [name]: value }))
  }

  const handlePriorityChange = (value: string) => {
    setRequest(prev => ({ ...prev, priority: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://0.0.0.0:55003/v2/support/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      })
      if (!response.ok) throw new Error('Failed to send support request')
      const data = await response.json()
      toast({
        title: "Success",
        description: data.detail || "Support request sent successfully",
        duration: 5000,
      })
      setIsOpen(false)
      // Reset the form
      setRequest({
        discord_name: '',
        reason: '',
        priority: '',
        email: ''
      })
    } catch (error) {
      console.error('Error sending support request:', error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send support request. Please try again.",
        duration: 5000,
      })
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-1/4 -translate-y-1/2 bg-[#2a2a2a] text-[#d6c8a6] py-2 px-4 rounded-r-md shadow-lg transform -rotate-90 origin-left transition-all hover:px-6 hover:bg-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-[#d6c8a6] focus:ring-opacity-50"
      >
        <HelpCircle className="h-5 w-5 inline-block mr-4" />
        <span className="font-semibold text-lg">Support</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 bottom-0 w-96 bg-black border-r border-[#d6c8a6] shadow-2xl overflow-y-auto"
          >
            <Card className="h-full bg-[#1a1a1a] border-none rounded-none">
              <CardHeader className="sticky top-0 z-10 bg-[#1a1a1a] pb-4 border-b border-[#d6c8a6]">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold text-[#d6c8a6]">Support Request</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-[#d6c8a6] hover:bg-[#2a2a2a]"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="discord_name" className="text-[#d6c8a6]">Discord Name</Label>
                    <Input
                      id="discord_name"
                      name="discord_name"
                      value={request.discord_name}
                      onChange={handleInputChange}
                      className="bg-[#2a2a2a] text-[#d6c8a6] border-[#d6c8a6]"
                      placeholder="Your Discord username"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason" className="text-[#d6c8a6]">Reason</Label>
                    <Textarea
                      id="reason"
                      name="reason"
                      value={request.reason}
                      onChange={handleInputChange}
                      className="bg-[#2a2a2a] text-[#d6c8a6] border-[#d6c8a6]"
                      placeholder="Describe your issue..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority" className="text-[#d6c8a6]">Priority</Label>
                    <Select onValueChange={handlePriorityChange} required>
                      <SelectTrigger className="bg-[#2a2a2a] text-[#d6c8a6] border-[#d6c8a6]">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-[#d6c8a6]">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={request.email}
                      onChange={handleInputChange}
                      className="bg-[#2a2a2a] text-[#d6c8a6] border-[#d6c8a6]"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="flex justify-end">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button type="submit" className="bg-[#d6c8a6] text-black hover:bg-[#f0e6ce]">
                            <Send className="mr-2 h-4 w-4" />
                            Send Request
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Submit your support request</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </form>

                <Alert className="mt-8 bg-[#2a2a2a] border-[#d6c8a6]">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-[#d6c8a6]">Need More Help?</AlertTitle>
                  <AlertDescription className="text-[#a09274]">
                    Check out our FAQ for quick answers to common questions.
                  </AlertDescription>
                  <Button variant="link" className="mt-2 text-[#d6c8a6] hover:text-[#f0e6ce]">
                    View FAQ
                  </Button>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}