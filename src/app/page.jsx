"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import Loader from "@/components/Loader"
import IntroScreen from "@/components/IntroScreen"
import MemoryGameScreen from "@/components/MemoryGameScreen"
import PhotoBookScreen from "@/components/PhotoBookScreen"
import FinalScreen from "@/components/FinalScreen"
import Music from "@/components/Music"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [musicStarted, setMusicStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  const handleIntroComplete = () => {
    if (!musicStarted) {
      setMusicStarted(true)
    }
    setCurrentScreen(1)
  }

  const handleGameComplete = () => {
    setGameCompleted(true)
    setTimeout(() => {
      setCurrentScreen(2)
    }, 2000)
  }

  const nextScreen = () => {
    setCurrentScreen((prev) => prev + 1)
  }

  if (isLoading) {
    return <Loader />
  }

  const screens = [
    <IntroScreen key="intro" onNext={handleIntroComplete} />,
    <MemoryGameScreen key="game" onGameComplete={handleGameComplete} gameCompleted={gameCompleted} />,
    <PhotoBookScreen key="photos" onNext={nextScreen} />,
    <FinalScreen key="final" />,
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-purple-950/70 overflow-hidden">

      {/* Background music */}
      <Music shouldPlay={musicStarted} />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {screens[currentScreen]}

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-[13px] text-white/50 pointer-events-none z-40 font-light">
        @anujbuilds
      </motion.div>
    </div>
  )
}
