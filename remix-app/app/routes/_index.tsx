// import {
//   SignInButton,
//   SignOutButton,
//   SignUpButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from '~clerk/remix'

// export default function Index() {
//   return (
//     <div>
//       <h1>Index Route</h1>
//       <SignedIn>
//         <p>You are signed in!</p>

//         <UserButton />
//       </SignedIn>
//       <SignedOut>
//         <p>You are signed out</p>

//         <SignInButton />
//       </SignedOut>
//     </div>
//   )
// }

import { Button } from "~/components/ui/button"
import { FeatureCard } from "~/components/cards/featured-card"
import { Brain, Zap, Search, Lock } from 'lucide-react'
import { Link } from "@remix-run/react"
 
export default function IndexPage() {
  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center bg-gradient-to-b from-background to-secondary/20">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Transform Your Notes with AI
          </h1>
          <p className="max-w-[42rem] mx-auto text-xl text-muted-foreground mb-8">
            Unlock the power of your PDFs with our intelligent note-taking app. 
            Organize, analyze, and interact with your documents like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/workspace">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Smarter Note-Taking
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <FeatureCard
              title="AI-Powered Analysis"
              description="Our advanced AI analyzes your PDFs, extracting key insights and generating summaries."
              icon={Brain}
            />
            <FeatureCard
              title="Instant Search"
              description="Quickly find the information you need with our powerful search functionality."
              icon={Search}
            />
            <FeatureCard
              title="Smart Tagging"
              description="Automatically categorize and tag your notes for effortless organization."
              icon={Zap}
            />
            <FeatureCard
              title="Secure Storage"
              description="Your notes are encrypted and securely stored, ensuring your data remains private."
              icon={Lock}
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-secondary/20">
          <h2 className="text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">1. Upload Your PDFs</h3>
                <p className="text-muted-foreground">
                  Simply drag and drop your PDF files into our app. We support multiple file uploads, 
                  so you can add all your documents at once.
                </p>
              </div>
              <div className="flex-1 bg-background p-6 rounded-lg shadow-lg">
                {/* Placeholder for an illustration or screenshot */}
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Upload Illustration</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row-reverse items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">2. AI Analysis</h3>
                <p className="text-muted-foreground">
                  Our AI engine processes your documents, extracting key information, 
                  identifying main topics, and generating concise summaries.
                </p>
              </div>
              <div className="flex-1 bg-background p-6 rounded-lg shadow-lg">
                {/* Placeholder for an illustration or screenshot */}
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">AI Analysis Illustration</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-4">3. Interact and Learn</h3>
                <p className="text-muted-foreground">
                  Explore your processed documents, ask questions, and gain new insights. 
                  Our AI assistant helps you understand and work with your notes more effectively.
                </p>
              </div>
              <div className="flex-1 bg-background p-6 rounded-lg shadow-lg">
                {/* Placeholder for an illustration or screenshot */}
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-muted-foreground">Interaction Illustration</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Revolutionize Your Note-Taking?
          </h2>
          <p className="max-w-[42rem] mx-auto text-xl text-muted-foreground mb-8">
            Join thousands of students, researchers, and professionals who are already 
            benefiting from our AI-powered note-taking app.
          </p>
          <Button size="lg" asChild>
            <Link to="/workspace">Get Started for Free</Link>
          </Button>
        </section>
      </div>
    </>
  )
}

