'use client'

import React, { useState } from 'react'
import { Wallet, ChartBar, Globe, MessageSquare, Shield, Zap, Users, Rocket } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChatBotModal from '@/components/ChatbotModal'
import RobotTransformerWallpaper from '@/components/RobotTransformerWallpaper'
import { motion } from 'framer-motion'

export default function LandingPage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  const handleOpenChatbot = () => setIsChatbotOpen(true)
  const handleCloseChatbot = () => setIsChatbotOpen(false)

  return (
    <div className="relative min-h-screen overflow-hidden">
      <RobotTransformerWallpaper />
      <div className="relative z-10 min-h-screen bg-gradient-to-b from-blue-900/5 to-purple-900/5 text-white font-sans">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Welcome to DeFi Starship
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-10 leading-relaxed text-cyan-100">
              Navigate the decentralized finance universe with our advanced control deck.
            </p>
            <div className="space-x-4">
              <Button size="lg" className="bg-cyan-500 text-black hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105">
                Launch Mission
              </Button>
              <Button size="lg" variant="outline" className="text-cyan-400 border-cyan-400 hover:bg-cyan-400/20 transition-all duration-300 transform hover:scale-105">
                Explore Systems
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-blue-900/40 text-cyan-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-cyan-300">Onboard Systems</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Wallet className="h-8 w-8 text-cyan-400" />}
                title="Quantum Vault"
                description="Secure your assets with our advanced multi-dimensional storage system."
                buttonText="Access Vault"
                buttonColor="bg-cyan-500 hover:bg-cyan-400"
              />
              <FeatureCard
                icon={<ChartBar className="h-8 w-8 text-cyan-400" />}
                title="Hyperdrive Analytics"
                description="Navigate market trends at lightspeed with our predictive AI algorithms."
                buttonText="Engage Hyperdrive"
                buttonColor="bg-cyan-500 hover:bg-cyan-400"
              />
              <FeatureCard
                icon={<Globe className="h-8 w-8 text-cyan-400" />}
                title="Galactic Exchange"
                description="Trade across multiple blockchain galaxies from a single interface."
                buttonText="Start Trading"
                buttonColor="bg-cyan-500 hover:bg-cyan-400"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-purple-900/40 text-cyan-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-cyan-300">Mission Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard number="01" title="Dock Your Wallet" description="Connect your crypto wallet to our secure docking station." />
              <StepCard number="02" title="Chart Your Course" description="Explore DeFi opportunities across the crypto universe." />
              <StepCard number="03" title="Engage Autopilot" description="Let our AI co-pilot optimize your DeFi strategy." />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-blue-900/40 text-cyan-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-cyan-300">Starship Advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BenefitCard
                icon={<Shield className="h-8 w-8 text-cyan-400" />}
                title="Quantum Encryption"
                description="Your assets are protected by state-of-the-art security protocols."
              />
              <BenefitCard
                icon={<Zap className="h-8 w-8 text-cyan-400" />}
                title="Warp-Speed Updates"
                description="Receive real-time notifications faster than the speed of light."
              />
              <BenefitCard
                icon={<Users className="h-8 w-8 text-cyan-400" />}
                title="Intergalactic Community"
                description="Join a thriving network of DeFi explorers and innovators."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900/60 to-purple-900/60 text-cyan-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-cyan-300">Ready to Launch?</h2>
            <p className="text-lg sm:text-xl mb-8">
              Initiate your DeFi journey with our AI-powered navigation system.
            </p>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black transition-all duration-300 transform hover:scale-105" onClick={handleOpenChatbot}>
              <Rocket className="mr-2 h-5 w-5" /> Activate AI Co-pilot
            </Button>
          </div>
        </section>

        {isChatbotOpen && <ChatBotModal onClose={handleCloseChatbot} isOpen={isChatbotOpen} />}
      </div>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, buttonText, buttonColor }) => (
  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="flex items-center text-2xl font-bold">
        {icon}
        <span className="ml-4">{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="mb-6 text-gray-600">{description}</p>
      <Button className={`w-full ${buttonColor} text-white`}>{buttonText}</Button>
    </CardContent>
  </Card>
)

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <Card>
    <CardContent >
      <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{number}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
)

const BenefitCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="text-center bg-white/10 p-6 rounded-lg">
    <div className="mb-4 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
  </div>
)

const TestimonialCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
  <Card>
    <CardContent >
      <p className="text-lg mb-4 italic">"{quote}"</p>
      <p className="font-semibold text-right">- {author}</p>
    </CardContent>
  </Card>
)
