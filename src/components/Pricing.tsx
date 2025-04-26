import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  Check,
  Brain,
  Cpu,
  Cloud,
  Shield,
  Star,
  ChevronRight,
} from "lucide-react"
import Button from "./Button"
import AnimatedSection from "./AnimatedSection"

interface PricingFeature {
  name: string
  included: boolean
  highlight?: boolean
}

interface PricingTier {
  name: string
  description: string
  price: string
  billingPeriod: string
  features: PricingFeature[]
  icon: React.ReactNode
  highlight?: boolean
  buttonVariant?: "primary" | "outline"
}

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true)

  const pricingTiers: PricingTier[] = [
    {
      name: "Početni",
      description: "Idealno za pojedince i male projekte",
      price: "Besplatno",
      billingPeriod: isAnnual
        ? "/mesec, naplaćuje se godišnje"
        : "/mesec, naplaćuje se mesečno",
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
      buttonVariant: "outline",
      features: [
        { name: "Do 5 AI modela", included: true },
        { name: "100.000 API poziva/mesec", included: true },
        { name: "Osnovna analitička tabla", included: true },
        { name: "Podrška putem e-pošte", included: true },
        { name: "Prilagođena obuka modela", included: false },
        { name: "Napredne bezbednosne funkcije", included: false },
        { name: "Posvećeni menadžer naloga", included: false },
        { name: "Prilagođene integracije", included: false },
      ],
    },
    {
      name: "Profesionalni",
      description: "Idealno za rastuće kompanije i timove",
      price: "2400 RSD",
      billingPeriod: isAnnual
        ? "/mesec, naplaćuje se godišnje"
        : "/mesec, naplaćuje se mesečno",
      icon: <Brain className="w-6 h-6 text-black" />,
      highlight: true,
      features: [
        { name: "Do 20 AI modela", included: true },
        { name: "500.000 API poziva/mesec", included: true },
        { name: "Napredna analitička tabla", included: true },
        { name: "Prioritetna podrška putem e-pošte i četa", included: true },
        { name: "Prilagođena obuka modela", included: true },
        { name: "Napredne bezbednosne funkcije", included: true },
        { name: "Posvećeni menadžer naloga", included: false },
        { name: "Prilagođene integracije", included: false },
      ],
    },
    {
      name: "Preduzetnički",
      description: "Za velike organizacije sa prilagođenim potrebama",
      price: "Prilagođeno",
      billingPeriod: isAnnual
        ? "/mesec, naplaćuje se godišnje"
        : "/mesec, naplaćuje se mesečno",
      icon: <Cloud className="w-6 h-6 text-indigo-500" />,
      buttonVariant: "outline",
      features: [
        { name: "Neograničeni AI modeli", included: true },
        { name: "Neograničeni API pozivi", included: true },
        { name: "Prilagođena analitička tabla", included: true },
        { name: "24/7 podrška putem telefona i četa", included: true },
        { name: "Prilagođena obuka modela", included: true },
        { name: "Napredne bezbednosne funkcije", included: true },
        { name: "Posvećeni menadžer naloga", included: true },
        { name: "Prilagođene integracije", included: true },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Pozadinske dekoracije */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/5 to-purple-500/5 rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-t from-indigo-500/5 to-blue-500/5 rounded-full blur-3xl transform -rotate-12"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center justify-center mb-4"
          >
            <span className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              Cenovni planovi
            </span>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Odaberite pravi plan za vaše potrebe
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Skalirajte svoje AI mogućnosti sa našim fleksibilnim cenovnim
            opcijama
          </motion.p>

          {/* Prekidač za naplatu */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mt-8 space-x-4"
          >
            <span
              className={`text-sm ${
                !isAnnual
                  ? "text-gray-900 dark:text-white font-medium"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Mesečna naplata
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isAnnual ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm ${
                isAnnual
                  ? "text-gray-900 dark:text-white font-medium"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Godišnja naplata
              <span className="ml-1.5 inline-flex items-center text-green-600 dark:text-green-400">
                Uštedite 20%
              </span>
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <AnimatedSection
              key={tier.name}
              delay={index * 0.1}
              className={`relative rounded-2xl ${
                tier.highlight
                  ? "bg-blue-600 text-white shadow-xl scale-105 z-10"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-500 text-white shadow-sm">
                    <Star size={14} className="mr-1" />
                    Najpopularnije
                  </span>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      {tier.icon}
                      {tier.name}
                    </h3>
                    <p
                      className={`mt-2 ${
                        tier.highlight
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {tier.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    <span
                      className={`ml-2 ${
                        tier.highlight
                          ? "text-blue-100"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {tier.billingPeriod}
                    </span>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature.name} className="flex items-start">
                        <div className="flex-shrink-0">
                          {feature.included ? (
                            <Check
                              className={`w-5 h-5 ${
                                tier.highlight
                                  ? "text-blue-200"
                                  : "text-green-500 dark:text-green-400"
                              }`}
                            />
                          ) : (
                            <span className="block w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
                          )}
                        </div>
                        <span
                          className={`ml-3 ${
                            feature.included
                              ? ""
                              : tier.highlight
                              ? "text-blue-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      variant="primary"
                      className={`w-full flex justify-center ${
                        tier.highlight
                          ? "!bg-black !text-white-600 hover:!bg-blue-50"
                          : ""
                      }`}
                    >
                      Započnite
                      <ChevronRight size={23} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Preduzetnički poziv */}
        <AnimatedSection delay={0.4} className="mt-16">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
            <div className="flex items-center justify-between flex-col md:flex-row gap-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Preduzetnička bezbednost i usklađenost
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
                  Potrebne su vam prilagođene bezbednosne funkcije ili zahtevi
                  za usklađenost? Naš preduzetnički plan uključuje napredne
                  bezbednosne mere, posvećenu podršku i prilagođena rešenja.
                </p>
              </div>
              <Button variant="outline" size="lg" className="whitespace-nowrap">
                Kontaktirajte prodaju
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

export default Pricing
