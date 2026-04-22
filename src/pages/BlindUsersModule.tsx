import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, Mic, MicOff, Volume2, Play, Search, BookOpen, Clock, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const voiceCommands = [
  { command: "\"Play Machine Learning video\"", action: "Opens the Machine Learning tutorial" },
  { command: "\"Search Python basics\"", action: "Searches for Python beginner content" },
  { command: "\"Read my notifications\"", action: "Reads out pending notifications" },
  { command: "\"Open bookmarks\"", action: "Lists saved content via audio" },
  { command: "\"What's trending?\"", action: "Reads popular topics aloud" },
  { command: "\"Go back\"", action: "Navigates to the previous page" },
];

const audioContent = [
  { title: "Introduction to Machine Learning", category: "AI & ML", duration: "12 min", status: "available" },
  { title: "Python for Beginners", category: "Programming", duration: "18 min", status: "available" },
  { title: "Data Structures Explained", category: "Computer Science", duration: "15 min", status: "available" },
  { title: "Web Development Basics", category: "Web Dev", duration: "20 min", status: "available" },
  { title: "Deep Learning Fundamentals", category: "AI & ML", duration: "22 min", status: "coming soon" },
  { title: "Operating Systems Overview", category: "Computer Science", duration: "14 min", status: "available" },
];

const BlindUsersModule = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!getSession()) navigate("/login");
  }, [navigate]);

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      setTranscript("");
      toast.info("Voice assistant stopped");
    } else {
      setIsListening(true);
      toast.success("Voice assistant is listening...");
      // Simulate a voice transcript after a delay
      setTimeout(() => {
        setTranscript("Play Machine Learning video");
        setTimeout(() => {
          toast.success("Opening: Introduction to Machine Learning");
          setIsListening(false);
        }, 2000);
      }, 3000);
    }
  };

  const filtered = audioContent.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display font-bold text-foreground text-lg">Voice Assistant</h1>
            <p className="text-xs text-muted-foreground">Audio-first interface for blind users</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-10">
        {/* Voice Assistant Hero */}
        <section className="flex flex-col items-center text-center space-y-6">
          <div
            className={`relative h-32 w-32 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
              isListening
                ? "bg-primary/20 ring-4 ring-primary/40 animate-pulse"
                : "bg-card border-2 border-border hover:border-primary/40"
            }`}
            onClick={toggleListening}
            role="button"
            aria-label={isListening ? "Stop listening" : "Start voice assistant"}
          >
            {isListening ? (
              <Mic className="h-12 w-12 text-primary" />
            ) : (
              <MicOff className="h-12 w-12 text-muted-foreground" />
            )}
            {isListening && (
              <>
                <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
                <span className="absolute -inset-3 rounded-full border border-primary/15 animate-ping" style={{ animationDelay: "0.5s" }} />
              </>
            )}
          </div>

          <div>
            <p className="text-lg font-display font-semibold text-foreground">
              {isListening ? "Listening..." : "Tap to Speak"}
            </p>
            {transcript && (
              <p className="mt-2 text-sm text-primary bg-primary/10 rounded-lg px-4 py-2 inline-block">
                "{transcript}"
              </p>
            )}
            {!isListening && !transcript && (
              <p className="text-sm text-muted-foreground mt-1">Say a command to navigate or play content</p>
            )}
          </div>
        </section>

        {/* Voice Commands Reference */}
        <section>
          <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-accent" /> Voice Commands
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {voiceCommands.map((vc) => (
              <Card key={vc.command} className="bg-card border-border">
                <CardContent className="py-4 flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                    <Headphones className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{vc.command}</p>
                    <p className="text-xs text-muted-foreground">{vc.action}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Audio Content Library */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-accent" /> Audio Library
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((content) => (
              <Card
                key={content.title}
                className="bg-card border-border hover:border-accent/30 transition-colors cursor-pointer group"
              >
                <CardContent className="py-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Play className="h-5 w-5 text-accent" />
                    </div>
                    {content.status === "coming soon" && (
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-foreground mb-1">{content.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-3">
                    <span>{content.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {content.duration}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlindUsersModule;
