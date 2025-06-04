"use client"

import { Download, Smartphone, Shield, Zap, Github, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const handleDownload = () => {
    // Create a blob with the app files for download
    const link = document.createElement("a")
    link.href = "/nfc-wallet-app.zip"
    link.download = "NFC-Wallet-App-v1.0.zip"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">NFC Wallet</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#download" className="text-gray-600 hover:text-gray-900 transition-colors">
              Download
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <Star className="w-3 h-3 mr-1" />
            Open Source Android App
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            NFC Wallet
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Reader App
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            A powerful Android application for reading and managing MIFARE Classic NFC cards. Perfect for wallet cards,
            access cards, and payment systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={handleDownload}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              <Download className="w-5 h-5 mr-2" />
              Download APK Source
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg"
              onClick={() => window.open("https://github.com/oussamapunisher/NFC-WALLET-APP", "_blank")}
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
            </Button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>1K+ Downloads</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>4.8 Rating</span>
            </div>
            <div>
              <span>Free & Open Source</span>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="w-64 h-96 mx-auto bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl p-4 flex flex-col">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">NFC Wallet Reader</h3>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4 text-left">
                    <p className="text-sm text-gray-600 mb-2">Scan a MIFARE Classic card...</p>
                    <div className="space-y-1 text-xs text-gray-500">
                      <div>{"UID: A1B2C3D4"}</div>
                      <div>{"Type: MIFARE Classic"}</div>
                      <div>{"Sectors: 16"}</div>
                      <div>{"Size: 1024 bytes"}</div>
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to read and manage NFC cards with advanced security and ease of use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>MIFARE Classic Support</CardTitle>
                <CardDescription>
                  Full support for reading MIFARE Classic cards with sector-based authentication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Read card UID and metadata</li>
                  <li>• Sector authentication</li>
                  <li>• Block data extraction</li>
                  <li>• Real-time card detection</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>Advanced security features with multiple authentication methods</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Key A & Key B support</li>
                  <li>• Default key handling</li>
                  <li>• NFC Forum compatibility</li>
                  <li>• Secure data transmission</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Fast & Reliable</CardTitle>
                <CardDescription>
                  Optimized performance with instant card recognition and data processing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Instant card detection</li>
                  <li>• Efficient data parsing</li>
                  <li>• Error handling & recovery</li>
                  <li>• Background processing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">Android 5.0+</div>
              <div className="text-gray-600">Minimum Version</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">NFC Required</div>
              <div className="text-gray-600">Hardware Requirement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">{"<5MB"}</div>
              <div className="text-gray-600">App Size</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-2">Java</div>
              <div className="text-gray-600">Programming Language</div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Download the complete Android Studio project and start building your NFC applications today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button
              size="lg"
              onClick={handleDownload}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Source Code
            </Button>
          </div>

          <div className="text-blue-100 text-sm">
            <p>Includes complete Android Studio project • Full source code • Documentation</p>
            <p className="mt-2">Compatible with Android Studio 4.0+ • Gradle build system</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About NFC Wallet App</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              NFC Wallet App is a comprehensive Android application designed for reading and managing MIFARE Classic NFC
              cards. Built with modern Android development practices, it provides a robust foundation for NFC-based
              applications.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Key Capabilities</h3>
            <ul className="space-y-2">
              <li>Read MIFARE Classic card information including UID, sector count, and block data</li>
              <li>Authenticate with various key types (Key A, Key B, default keys)</li>
              <li>Parse and interpret card data with customizable data structures</li>
              <li>Handle NFC intents and foreground dispatch for seamless card detection</li>
              <li>Comprehensive error handling and logging for debugging</li>
            </ul>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Use Cases</h3>
            <ul className="space-y-2">
              <li>Wallet and payment card analysis</li>
              <li>Access control system integration</li>
              <li>Transit card data reading</li>
              <li>Educational NFC development</li>
              <li>Security research and testing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NFC Wallet App</span>
            </div>
            <div className="text-gray-400 text-sm">© 2024 NFC Wallet App. Open source project.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
