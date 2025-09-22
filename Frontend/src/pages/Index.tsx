import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome
          </CardTitle>
          <CardDescription className="text-lg">
            Access your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link to="/signin" className="block">
            <Button className="w-full bg-gradient-primary hover:opacity-90 transition-smooth shadow-soft">
              Sign In
            </Button>
          </Link>
          <Link to="/signup" className="block">
            <Button variant="outline" className="w-full transition-smooth">
              Create Account
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
