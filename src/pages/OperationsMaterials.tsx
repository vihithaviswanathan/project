import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OperationsMaterials = () => {
  return (
    <div className="flex-1 p-6 space-y-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Materials</h1>
        <p className="text-muted-foreground">Operations materials management and tracking</p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create">Create</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="text-center py-12">
          <h3 className="text-lg font-medium">Materials Management</h3>
          <p className="text-muted-foreground">Create and manage materials data</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationsMaterials;