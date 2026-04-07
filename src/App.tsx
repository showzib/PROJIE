import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { DarkModeToggle } from "@/components/ui/toggle"; 
import { Badge } from "./components/ui/badge";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 gap-6">
      {/* Dark Mode Toggle at top-right or center */}
      <div className="self-end bg-bgtoggle-500 text-toggle-500 rounded-full hover:bg-hovertoggle-500">
        <DarkModeToggle />
        
      </div>
        <Badge/>

      <Card className="w-80">
        <CardHeader>
          <CardTitle>ShadCN Card</CardTitle>
          <CardDescription>
            Card Description
          </CardDescription>
        </CardHeader>
        <CardContent>
          Card Content
        </CardContent>
        <CardFooter>
          <CardAction>
            <button className="px-4 py-2 bg-bgbtn-500  rounded hover:bg-hoverbtn-500">
              Click Me
            </button>
          </CardAction>
        </CardFooter>
      </Card>
    </div>
  );
}

export default App;