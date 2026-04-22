import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Hand, MessageSquare, Star, ChevronRight, Search, Clock, Award, Play, X, ClipboardCheck } from "lucide-react";
import SelfAssessment from "@/components/SelfAssessment";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const categoryVideos: Record<string, { title: string; videoId: string; duration: string }[]> = {
  "Alphabets (A–Z)": [
    { title: "Sign Language Alphabets – Part 1", videoId: "Vj_13bdU4dU", duration: "5 min" },
    { title: "Sign Language Alphabets – Part 2", videoId: "sHyG7iz3ork", duration: "5 min" },
    { title: "Sign Language Alphabets – Part 3", videoId: "cGavOVNDj1s", duration: "5 min" },
    { title: "Sign Language Alphabets – Part 4", videoId: "X33AHHqeU60", duration: "5 min" },
    { title: "Sign Language Alphabets – Part 5", videoId: "ysk7H6bXihM", duration: "5 min" },
    { title: "Full Alphabet Practice", videoId: "tkMg8g8vVUo", duration: "8 min" },
  ],
  "Numbers (0–9)": [
    { title: "Numbers in Sign Language – Part 1", videoId: "Y4stD_ypaAI", duration: "6 min" },
    { title: "Numbers in Sign Language – Part 2", videoId: "koOvrKENdH8", duration: "5 min" },
    { title: "Learn ASL Numbers Fast", videoId: "xVrWjakfAG0", duration: "18 min" },
    { title: "Numbers Practice Guide", videoId: "jjvzIgFNY9Q", duration: "5 min" },
    { title: "Counting in Sign Language", videoId: "vnH2BmcSRMA", duration: "5 min" },
    { title: "Advanced Number Signs", videoId: "Bq9Jw8ofSZ4", duration: "5 min" },
  ],
  "Common Phrases": [
    { title: "Common Phrases in Sign Language", videoId: "TWwKwKH8MwA", duration: "5 min" },
    { title: "Everyday Sign Language Phrases", videoId: "0FcwzMq4iWg", duration: "5 min" },
    { title: "Basic Greetings & Responses", videoId: "nJx-XsxeajQ", duration: "4 min" },
    { title: "Essential Sign Language Conversations", videoId: "_c--P6VRTUo", duration: "5 min" },
    { title: "How Are You?", videoId: "v1desDduz5M", duration: "5 min" },
    { title: "My Name Is...", videoId: "v1desDduz5M", duration: "5 min" },
  ],
  "Emergency Signs": [
    { title: "Emergency Sign Language Guide", videoId: "HizHZ4iGDVc", duration: "6 min" },
    { title: "Emergency ASL Signs", videoId: "jFC55wmWZJM", duration: "2 min" },
    { title: "Help & Danger Signs", videoId: "jFC55wmWZJM", duration: "3 min" },
    { title: "Hospital & Doctor Signs", videoId: "jFC55wmWZJM", duration: "3 min" },
    { title: "Police & Fire Signs", videoId: "jFC55wmWZJM", duration: "3 min" },
  ],
};

const categories = [
  {
    title: "Alphabets (A–Z)",
    description: "Learn to sign every letter of the alphabet with step-by-step hand illustrations.",
    icon: BookOpen,
    level: "Beginner",
  },
  {
    title: "Numbers (0–9)",
    description: "Master number signs used in daily conversations and counting.",
    icon: Hand,
    level: "Beginner",
  },
  {
    title: "Common Phrases",
    description: "Everyday phrases like greetings, asking for help, and basic responses.",
    icon: MessageSquare,
    level: "Intermediate",
  },
  {
    title: "Emergency Signs",
    description: "Critical signs for emergencies — help, danger, hospital, police, fire.",
    icon: Star,
    level: "Essential",
  },
  {
    title: "Self Assessment",
    description: "Test your sign language knowledge and see how much you've learned.",
    icon: ClipboardCheck,
    level: "Test",
  },
];

const OtherUsersModule = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);

  useEffect(() => {
    if (!getSession()) navigate("/login");
  }, [navigate]);

  const currentVideos = selectedCategory ? categoryVideos[selectedCategory] || [] : [];

  const filteredVideos = currentVideos.filter((v) =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  if (showAssessment) {
    return <SelfAssessment onBack={() => setShowAssessment(false)} />;
  }

  // Category list view
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto flex items-center gap-4 py-4 px-6">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-display font-bold text-foreground text-lg">Learn Sign Language</h1>
              <p className="text-xs text-muted-foreground">Interactive lessons for everyone</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-8 space-y-10">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Lessons", value: "23", icon: BookOpen },
              { label: "Categories", value: "5", icon: Hand },
              { label: "Avg Duration", value: "5 min", icon: Clock },
              { label: "Certificate", value: "Available", icon: Award },
            ].map((s) => (
              <Card key={s.label} className="bg-card border-border">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                    <s.icon className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="text-lg font-display font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Categories */}
          <section>
            <h2 className="text-xl font-display font-bold text-foreground mb-4">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <Card
                  key={cat.title}
                  className="bg-card border-border hover:border-success/40 transition-colors cursor-pointer group"
                  onClick={() => cat.title === "Self Assessment" ? setShowAssessment(true) : setSelectedCategory(cat.title)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                        <cat.icon className="h-6 w-6 text-success" />
                      </div>
                      <Badge variant="secondary" className="text-xs">{cat.level}</Badge>
                    </div>
                    <CardTitle className="text-foreground text-lg mt-2">{cat.title}</CardTitle>
                    <CardDescription>{cat.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{cat.title === "Self Assessment" ? "20 questions" : `${(categoryVideos[cat.title] || []).length} video lessons`}</span>
                      <ChevronRight className="h-4 w-4 group-hover:text-success transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Video lessons view for selected category
  const catInfo = categories.find((c) => c.title === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center gap-4 py-4 px-6">
          <Button variant="ghost" size="icon" onClick={() => { setSelectedCategory(null); setPlayingVideo(null); }}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-display font-bold text-foreground text-lg">{selectedCategory}</h1>
            <p className="text-xs text-muted-foreground">{catInfo?.description}</p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Currently playing video */}
        {playingVideo && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-foreground">Now Playing</h2>
              <Button variant="ghost" size="icon" onClick={() => setPlayingVideo(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-card">
              <iframe
                src={`https://www.youtube.com/embed/${playingVideo}?autoplay=1`}
                title="Sign Language Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search video lessons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Video list */}
        <section>
          <h2 className="text-xl font-display font-bold text-foreground mb-4">
            Video Lessons ({filteredVideos.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVideos.map((video, i) => (
              <Card
                key={video.title}
                className={`bg-card border-border hover:border-success/30 transition-all cursor-pointer group ${
                  playingVideo === video.videoId ? "border-success/60 ring-1 ring-success/30" : ""
                }`}
                onClick={() => setPlayingVideo(video.videoId)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-secondary rounded-t-lg overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-12 w-12 rounded-full bg-success flex items-center justify-center">
                      <Play className="h-5 w-5 text-success-foreground ml-0.5" />
                    </div>
                  </div>
                  <Badge className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs">
                    {video.duration}
                  </Badge>
                </div>
                <CardContent className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-success/10 flex items-center justify-center text-success font-display font-bold text-xs shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="font-medium text-foreground text-sm">{video.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p>No video lessons found matching your search.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default OtherUsersModule;
