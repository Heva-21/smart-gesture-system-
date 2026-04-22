import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getSession, logout, type User } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LogOut, Hand, Eye, EyeOff, Users, Activity, Shield, Sparkles } from "lucide-react";
import { toast } from "sonner";

const modules = [
  {
    title: "Specially Abled Users",
    description: "Gesture recognition tailored for users with physical disabilities. Supports adaptive gestures, customizable sensitivity, and assistive controls.",
    icon: Shield,
    gradient: "from-primary/20 to-primary/5",
    borderColor: "border-primary/30",
    iconColor: "text-primary",
    features: ["Adaptive Gesture Mapping", "Custom Sensitivity", "Voice Feedback"],
    route: "/module/specially-abled",
  },
  {
    title: "Blind Users",
    description: "Audio-guided gesture interface with haptic feedback support. Designed for seamless navigation without visual dependency.",
    icon: EyeOff,
    gradient: "from-accent/20 to-accent/5",
    borderColor: "border-accent/30",
    iconColor: "text-accent",
    features: ["Audio Navigation", "Haptic Feedback", "Screen Reader Support"],
    route: "/module/blind-users",
  },
  {
    title: "Other Users",
    description: "General-purpose gesture recognition for everyday use. Control presentations, smart devices, and applications hands-free.",
    icon: Users,
    gradient: "from-success/20 to-success/5",
    borderColor: "border-success/30",
    iconColor: "text-success",
    features: ["Device Control", "Presentation Mode", "Smart Home Integration"],
    route: "/module/other-users",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate("/login");
      return;
    }
    setUser(session);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center animate-pulse-glow">
              <Hand className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display font-bold text-foreground text-lg">SGRS Dashboard</h1>
              <p className="text-xs text-muted-foreground">Smart Gesture Recognition System</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              Welcome, <span className="text-primary font-semibold">{user.username}</span>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout} className="border-border text-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Gestures", value: "24+", icon: Hand, color: "text-primary" },
            { label: "Active Modules", value: "3", icon: Activity, color: "text-accent" },
            { label: "Accuracy Rate", value: "96.5%", icon: Sparkles, color: "text-success" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card border-border">
              <CardContent className="flex items-center gap-4 py-5">
                <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modules */}
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Choose Your Module</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod, i) => (
            <Card
              key={mod.title}
              className={`bg-gradient-to-br ${mod.gradient} border ${mod.borderColor} hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <CardHeader>
                <div className={`h-14 w-14 rounded-2xl bg-card flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <mod.icon className={`h-7 w-7 ${mod.iconColor}`} />
                </div>
                <CardTitle className="text-foreground font-display text-xl">{mod.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{mod.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mod.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                      <div className={`h-1.5 w-1.5 rounded-full ${mod.iconColor} bg-current`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full mt-5 border-border text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/30 font-display"
                  onClick={() => navigate(mod.route)}
                >
                  Explore Module
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
