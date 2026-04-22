import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, EarOff, MessageSquareOff, Hand, Type, Image, Volume2, Keyboard, Pen, Video, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const deafFeatures = [
  {
    title: "Real-Time Captioning",
    description: "Live speech-to-text captions during video calls and lectures. Never miss a word.",
    icon: Type,
    status: "Active",
  },
  {
    title: "Visual Alerts",
    description: "Flashing screen indicators for notifications, alarms, and doorbell rings.",
    icon: Image,
    status: "Active",
  },
  {
    title: "Sign Language Videos",
    description: "Video library of sign language tutorials organized by difficulty level.",
    icon: Video,
    status: "Active",
  },
  {
    title: "Vibration Feedback",
    description: "Haptic vibration patterns for different types of alerts and notifications.",
    icon: Sparkles,
    status: "Coming Soon",
  },
];

const dumbFeatures = [
  {
    title: "Text-to-Speech",
    description: "Type your message and the system speaks it aloud for you in a natural voice.",
    icon: Volume2,
    status: "Active",
  },
  {
    title: "Quick Phrases Board",
    description: "Pre-set common phrases you can tap to communicate instantly.",
    icon: Keyboard,
    status: "Active",
  },
  {
    title: "Gesture-to-Text",
    description: "Use hand gestures captured by camera to form words and sentences.",
    icon: Hand,
    status: "Active",
  },
  {
    title: "Drawing Board",
    description: "Draw or write on screen to communicate when gestures aren't enough.",
    icon: Pen,
    status: "Active",
  },
];

const quickPhrases = [
  "Hello!", "Thank you", "Yes", "No", "Please help me",
  "I need water", "Where is the restroom?", "Call an ambulance",
  "I'm fine", "Goodbye", "Excuse me", "I don't understand",
];

const SpeciallyAbledModule = () => {
  const navigate = useNavigate();
  const [ttsText, setTtsText] = useState("");
  const [spokenText, setSpokenText] = useState("");

  useEffect(() => {
    if (!getSession()) navigate("/login");
  }, [navigate]);

  const handleSpeak = () => {
    if (!ttsText.trim()) {
      toast.error("Please type a message first");
      return;
    }
    setSpokenText(ttsText);
    toast.success(`Speaking: "${ttsText}"`);
    setTtsText("");
  };

  const handleQuickPhrase = (phrase: string) => {
    setSpokenText(phrase);
    toast.success(`Speaking: "${phrase}"`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display font-bold text-foreground text-lg">Specially Abled Module</h1>
            <p className="text-xs text-muted-foreground">Assistive tools for deaf and dumb users</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="deaf" className="space-y-8">
          <TabsList className="bg-card border border-border p-1 h-auto">
            <TabsTrigger value="deaf" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 px-6 py-2.5">
              <EarOff className="h-4 w-4" /> Deaf Users
            </TabsTrigger>
            <TabsTrigger value="dumb" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2 px-6 py-2.5">
              <MessageSquareOff className="h-4 w-4" /> Mute Users
            </TabsTrigger>
          </TabsList>

          {/* Deaf Users Tab */}
          <TabsContent value="deaf" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deafFeatures.map((feat) => (
                <Card key={feat.title} className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <feat.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                        feat.status === "Active"
                          ? "text-success bg-success/10"
                          : "text-muted-foreground bg-secondary"
                      }`}>
                        {feat.status}
                      </span>
                    </div>
                    <CardTitle className="text-foreground text-lg mt-2">{feat.title}</CardTitle>
                    <CardDescription>{feat.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                      Open Feature
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Captioning Demo */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Type className="h-5 w-5 text-primary" /> Live Captioning Preview
                </CardTitle>
                <CardDescription>Real-time captions appear here during calls or lectures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/50 rounded-lg p-6 min-h-[120px] flex items-center justify-center">
                  <p className="text-muted-foreground text-sm italic">
                    Captions will appear here in real-time when a session is active...
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mute Users Tab */}
          <TabsContent value="dumb" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dumbFeatures.map((feat) => (
                <Card key={feat.title} className="bg-card border-border hover:border-accent/30 transition-colors cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <feat.icon className="h-6 w-6 text-accent" />
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                        feat.status === "Active"
                          ? "text-success bg-success/10"
                          : "text-muted-foreground bg-secondary"
                      }`}>
                        {feat.status}
                      </span>
                    </div>
                    <CardTitle className="text-foreground text-lg mt-2">{feat.title}</CardTitle>
                    <CardDescription>{feat.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full border-border text-foreground hover:bg-accent/10 hover:text-accent hover:border-accent/30">
                      Open Feature
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Text-to-Speech Tool */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-accent" /> Text-to-Speech
                </CardTitle>
                <CardDescription>Type your message and let the system speak for you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Type what you want to say..."
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  className="bg-secondary/50 border-border min-h-[80px] resize-none"
                />
                <Button onClick={handleSpeak} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Volume2 className="h-4 w-4 mr-2" /> Speak
                </Button>
                {spokenText && (
                  <div className="bg-accent/10 rounded-lg p-3 text-sm text-foreground">
                    Last spoken: "{spokenText}"
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Phrases */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground text-lg flex items-center gap-2">
                  <Keyboard className="h-5 w-5 text-accent" /> Quick Phrases
                </CardTitle>
                <CardDescription>Tap any phrase to speak it instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {quickPhrases.map((phrase) => (
                    <Button
                      key={phrase}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickPhrase(phrase)}
                      className="border-border text-foreground hover:bg-accent/10 hover:text-accent hover:border-accent/30 active:scale-[0.97] transition-all"
                    >
                      {phrase}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SpeciallyAbledModule;
