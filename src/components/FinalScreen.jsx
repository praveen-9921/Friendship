"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Heart, Sparkles, Star } from "lucide-react"
import confetti from "canvas-confetti"

export default function FinalMessageScreen() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [allMessagesShown, setAllMessagesShown] = useState(false)
  const [startTyping, setStartTyping] = useState(false)
  const [titleComplete, setTitleComplete] = useState(false)

  const messages = [
    "Hey bestie! 💕",
    "You mean the world to me...",
    "Through every laugh, every tear, every crazy adventure...",
    "You've been my constant, my support, my partner in crime! 🎉",
    "Thank you for being the most amazing friend anyone could ask for! ✨",
    "Here's to many more years of friendship, fun, and unforgettable memories! 🥳",
    "Happy Friendship Day, my dear friend! 💖",
  ]

  const titleLetters = "HAPPY FRIENDSHIP DAY!".split("")

  // Special entrance effect
  useEffect(() => {
    // Trigger confetti on entrance
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00ffff", "#ff00ff", "#ffff00", "#ff69b4"],
      })
    }, 500)

    // Start typing after title animation completes
    const timer = setTimeout(() => {
      setTitleComplete(true)
      setTimeout(() => {
        setStartTyping(true)
      }, 1000)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  // Fixed typing effect - no undefined or gibberish
  useEffect(() => {
    if (!startTyping || currentMessageIndex >= messages.length) return

    const currentMessage = messages[currentMessageIndex]
    if (!currentMessage) return

    let charIndex = 0
    setDisplayedText("")

    const typingInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayedText(currentMessage.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typingInterval)
        // Message complete, wait then move to next
        setTimeout(() => {
          if (currentMessageIndex < messages.length - 1) {
            setCurrentMessageIndex((prev) => prev + 1)
          } else {
            setAllMessagesShown(true)
          }
        }, 1500)
      }
    }, 60)

    return () => clearInterval(typingInterval)
  }, [startTyping, currentMessageIndex, messages])

  // Smooth cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 600)

    return () => clearInterval(cursorInterval)
  }, [])

  const triggerCelebration = () => {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ["#00ffff", "#ff00ff", "#ffff00", "#ff69b4"],
    })

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.2, y: 0.6 },
        colors: ["#00ffff", "#ff00ff"],
      })
    }, 300)

    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.8, y: 0.6 },
        colors: ["#ffff00", "#ff69b4"],
      })
    }, 600)
  }

  return (
    <div className="min-h-screen relative">

      {/* Fixed smooth background effects - no re-rendering */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.04),transparent_70%)]" />
      </div>

      {/* Simple smooth floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-15, 15, -15],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          >
            {i % 3 === 0 && <Heart className="w-3 h-3 text-pink-300" fill="currentColor" />}
            {i % 3 === 1 && <Star className="w-3 h-3 text-yellow-300" fill="currentColor" />}
            {i % 3 === 2 && <Sparkles className="w-3 h-3 text-cyan-300" />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Letter by letter title animation with original gradient */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              animate={{
                textShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                  "0 0 40px rgba(236, 72, 153, 0.5)",
                  "0 0 20px rgba(6, 182, 212, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="mb-2">
                {titleLetters.slice(0, 5).map((letter, index) => (
                  <motion.span
                    key={`happy-${index}`}
                    className="inline-block bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: -50, scale: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: index * 0.2,
                      duration: 0.8,
                      ease: "backOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              <div className="mb-2">
                {titleLetters.slice(6, 16).map((letter, index) => (
                  <motion.span
                    key={`friendship-${index}`}
                    className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 50, scale: 0 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 1 + index * 0.15,
                      duration: 0.8,
                      ease: "backOut",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </div>
              <div>
                {titleLetters.slice(17).map((letter, index) => (
                  <motion.span
                    key={`day-${index}`}
                    className="inline-block bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0, rotate: 180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                      delay: 2.5 + index * 0.2,
                      duration: 0.8,
                      ease: "backOut",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.h1>
          </motion.div>

          {/* Message container - appears after title */}
          {titleComplete && (
            <motion.div
              className="bg-black/50 backdrop-blur-lg rounded-3xl p-6 md:p-12 border border-cyan-500/30 shadow-2xl mb-12"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: "backOut" }}
            >
              {!allMessagesShown ? (
                // Fixed typing effect display
                <div className="min-h-[120px] flex items-center justify-center">
                  <div className="text-xl md:text-2xl text-white leading-relaxed font-medium text-center">
                    {displayedText}
                    {showCursor && !allMessagesShown && (
                      <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 opacity-100 animate-pulse" />
                    )}
                  </div>
                </div>
              ) : (
                // All messages display
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <motion.p
                        key={index}
                        className="text-base md:text-lg text-gray-300 leading-relaxed"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.6 }}
                      >
                        {message}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    className="flex justify-center items-center gap-4 mt-8 text-2xl font-bold"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                    <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                      You're the Best Friend!
                    </span>
                    <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Celebration button */}
          {allMessagesShown && (
            <motion.button
              onClick={triggerCelebration}
              className="group px-10 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white text-lg font-bold rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 border-2 border-transparent hover:border-cyan-400/50"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 2.5, duration: 1, ease: "backOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-3">
                <Sparkles className="w-6 h-6" />
                Celebrate Our Friendship!
                <Star className="w-6 h-6" />
              </span>
            </motion.button>
          )}

          {/* Footer */}
          {allMessagesShown && (
            <motion.p
              className="text-gray-500 mt-6 text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.8 }}
            >
              Made with 💖 for an amazing friend!
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}
