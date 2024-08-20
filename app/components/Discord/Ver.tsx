// app/components/Discord/ver.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Users, ChevronRight, ChevronLeft, Check, AlertCircle } from 'lucide-react';

const steps = [
  { id: 'agreement', title: 'Terms & Conditions' },
  { id: 'discord-id', title: 'Discord ID' },
  { id: 'verification', title: 'Verification' },
];

const DiscordRoleVerification = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [discordId, setDiscordId] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setError('');
    setRole('');

    try {
      const response = await fetch('http://0.0.0.0:55001/v2/getrole/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: `user_input=${discordId}`
      });

      const data = await response.json();

      if (response.ok) {
        setRole(data.message);
        handleNext();
      } else {
        setError(data.detail || 'An error occurred');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-black text-white min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h1 
          className="text-5xl font-bold text-center mb-12 text-[#d6c8a6]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Discord Role Verification
        </motion.h1>

        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`flex items-center ${index <= currentStep ? 'text-[#d6c8a6]' : 'text-gray-500'}`}>
                <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                  index <= currentStep ? 'border-[#d6c8a6]' : 'border-gray-500'
                } flex items-center justify-center`}>
                  {index < currentStep ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="text-lg">{index + 1}</span>
                  )}
                </div>
                <motion.div 
                  className="ml-2 font-medium"
                  initial={false}
                  animate={{ scale: index === currentStep ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step.title}
                </motion.div>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  index < currentStep ? 'border-[#d6c8a6]' : 'border-gray-500'
                } mx-4 mt-6`}></div>
              )}
            </React.Fragment>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="bg-[#1a1a1a] border-[#d6c8a6] text-white">
              <CardHeader>
                <CardTitle className="text-2xl text-[#d6c8a6]">{steps[currentStep].title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {currentStep === 0 && "Please read and accept our terms and conditions."}
                  {currentStep === 1 && "Enter your Discord ID to proceed with verification."}
                  {currentStep === 2 && "Verifying your Discord role..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div className="h-40 overflow-y-auto bg-[#2a2a2a] p-4 rounded-md">
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus tortor.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="terms" 
                        checked={agreed}
                        onCheckedChange={(checked) => setAgreed(checked)}
                        className="border-[#d6c8a6] text-[#d6c8a6]"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </label>
                    </div>
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <Input
                      id="discordId"
                      type="text"
                      value={discordId}
                      onChange={(e) => setDiscordId(e.target.value)}
                      className="bg-[#2a2a2a] border-[#d6c8a6] text-white"
                      placeholder="Enter your Discord ID"
                    />
                    {error && (
                      <Alert variant="destructive" className="bg-red-900 border-red-500">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="text-center">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Users className="w-16 h-16 text-[#d6c8a6] mx-auto" />
                      </motion.div>
                    ) : role ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <Alert className="bg-[#2a2a2a] border-[#d6c8a6]">
                          <Check className="h-6 w-6 text-green-500" />
                          <AlertTitle className="text-[#d6c8a6] text-lg">Role Verified</AlertTitle>
                          <AlertDescription className="text-white text-lg">
                            {role}
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    ) : null}
                  </div>
                )}
              </CardContent>
              <Separator className="bg-[#d6c8a6] my-4" />
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="bg-transparent border-[#d6c8a6] text-[#d6c8a6] hover:bg-[#d6c8a6] hover:text-black"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button 
                    onClick={currentStep === 1 ? handleVerify : handleNext}
                    disabled={(currentStep === 0 && !agreed) || (currentStep === 1 && !discordId)}
                    className="bg-[#d6c8a6] text-black hover:bg-[#c0b28e]"
                  >
                    {currentStep === 1 ? 'Verify' : 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={() => setCurrentStep(0)}
                    className="bg-[#d6c8a6] text-black hover:bg-[#c0b28e]"
                  >
                    Go to server <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DiscordRoleVerification;