import Image from "next/image"
import { Button } from "@/components/ui/button"

export function CertificateSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Take a keyboarding speed test and get your certificate
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Take an online typing test to find out your typing speed and impress friends or employers with your personal typing certificate.
          </p>
          <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
            Get a certificate
          </Button>
        </div>
        <div className="relative">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/placeholder.svg"
              alt="Typing Certificate Example"
              fill
              className="object-contain"
            />
          </div>
          {/* Yellow mascot positioned over the certificate */}
          <div className="absolute -left-8 bottom-0 w-32 h-32">
            <Image
              src="/placeholder.svg"
              alt="Mascot"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
