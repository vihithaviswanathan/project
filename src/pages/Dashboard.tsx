import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollapsibleSection from "@/components/CollapsibleSection";
import FormField from "@/components/FormField";

const Dashboard = () => {
  const [basicInfo, setBasicInfo] = useState({
    dateReporting: "",
    dataSheetsFilledBy: "",
    dataSheetsApprovedBy: "",
    assetNameLocation: "",
    total: ""
  });

  const [capacityData, setCapacityData] = useState({
    solarProject1Location: "",
    solarProject1Value: "0000",
    solarProject1Units: "Units",
    solarProject2Value: "0000", 
    solarProject2Units: "Units",
    total: "",
    remarks: ""
  });

  const [plantLoadData, setPlantLoadData] = useState({
    percentage: "0000",
    units: "Units",
    remarks: ""
  });

  const [energyOutputData, setEnergyOutputData] = useState({
    solarValue: "0000",
    solarUnits: "Units",
    otherValue: "0000",
    otherUnits: "Units", 
    total: ""
  });

  return (
    <div className="flex-1 p-6 space-y-6 bg-background">
      {/* Tab Navigation */}
      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create" className="bg-primary text-primary-foreground">Create</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-6">
          {/* Basic Informations Section */}
          <CollapsibleSection title="Basic Informations">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Date of Reporting"
                type="date"
                value={basicInfo.dateReporting}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, dateReporting: value }))}
              />
              <FormField
                label="Data sheets filled by"
                value={basicInfo.dataSheetsFilledBy}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, dataSheetsFilledBy: value }))}
              />
              <FormField
                label="Data sheets approved by"
                value={basicInfo.dataSheetsApprovedBy}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, dataSheetsApprovedBy: value }))}
              />
              <FormField
                label="Asset name and location"
                value={basicInfo.assetNameLocation}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, assetNameLocation: value }))}
              />
              <FormField
                label="Total"
                value={basicInfo.total}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, total: value }))}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-primary hover:bg-primary/90">Save & Continue</Button>
            </div>
          </CollapsibleSection>

          {/* Installed Capacity Section */}
          <CollapsibleSection title="Installed Capacity, broken down by primary energy source and by regulatory regime">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-muted px-3 py-1 rounded text-sm">09-07-2025</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                <div className="md:col-span-2">
                  <FormField
                    label="Solar Project 1- Location"
                    value={capacityData.solarProject1Location}
                    onChange={(value) => setCapacityData(prev => ({ ...prev, solarProject1Location: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label=""
                    value={capacityData.solarProject1Value}
                    onChange={(value) => setCapacityData(prev => ({ ...prev, solarProject1Value: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label=""
                    type="select"
                    options={["Units", "MW", "KW"]}
                    value={capacityData.solarProject1Units}
                    onChange={(value) => setCapacityData(prev => ({ ...prev, solarProject1Units: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label="Solar Project 2"
                    value={capacityData.solarProject2Value}
                    onChange={(value) => setCapacityData(prev => ({ ...prev, solarProject2Value: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label=""
                    type="select"
                    options={["Units", "MW", "KW"]}
                    value={capacityData.solarProject2Units}
                    onChange={(value) => setCapacityData(prev => ({ ...prev, solarProject2Units: value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label="Total"
                  value={capacityData.total}
                  onChange={(value) => setCapacityData(prev => ({ ...prev, total: value }))}
                />
                <FormField
                  label="Remarks"
                  value={capacityData.remarks}
                  onChange={(value) => setCapacityData(prev => ({ ...prev, remarks: value }))}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-primary hover:bg-primary/90">Save & Continue</Button>
            </div>
          </CollapsibleSection>

          {/* Plant Load Factor Section */}
          <CollapsibleSection title="Plant Load Factor">
            <div className="space-y-4">
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">Frequency of measurement</Button>
                <Button variant="outline" size="sm">Calculated data</Button>
                <div className="bg-muted px-3 py-1 rounded text-sm">09-07-2025</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FormField
                    label="Percentage of Plant Load Factor"
                    value={plantLoadData.percentage}
                    onChange={(value) => setPlantLoadData(prev => ({ ...prev, percentage: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label=""
                    type="select"
                    options={["Units", "%"]}
                    value={plantLoadData.units}
                    onChange={(value) => setPlantLoadData(prev => ({ ...prev, units: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label="Remarks"
                    value={plantLoadData.remarks}
                    onChange={(value) => setPlantLoadData(prev => ({ ...prev, remarks: value }))}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-primary hover:bg-primary/90">Save & Continue</Button>
            </div>
          </CollapsibleSection>

          {/* EU-2 Net Energy Output Section */}
          <CollapsibleSection title="EU-2 Net Energy output broken down by primary energy source and by regulatory regime">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-muted px-3 py-1 rounded text-sm">09-07-2025</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                <div>
                  <FormField
                    label="Solar"
                    value={energyOutputData.solarValue}
                    onChange={(value) => setEnergyOutputData(prev => ({ ...prev, solarValue: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label=""
                    type="select"
                    options={["Units", "MWh", "KWh"]}
                    value={energyOutputData.solarUnits}
                    onChange={(value) => setEnergyOutputData(prev => ({ ...prev, solarUnits: value }))}
                  />
                </div>
                <div>
                  <Button variant="outline" size="sm">Other Fuel types</Button>
                </div>
                <div>
                  <FormField
                    label="Other"
                    value={energyOutputData.otherValue}
                    onChange={(value) => setEnergyOutputData(prev => ({ ...prev, otherValue: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label=""
                    type="select"
                    options={["Units", "MWh", "KWh"]}
                    value={energyOutputData.otherUnits}
                    onChange={(value) => setEnergyOutputData(prev => ({ ...prev, otherUnits: value }))}
                  />
                </div>
                <div>
                  <FormField
                    label="Total"
                    value={energyOutputData.total}
                    onChange={(value) => setEnergyOutputData(prev => ({ ...prev, total: value }))}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-primary hover:bg-primary/90">Save & Continue</Button>
            </div>
          </CollapsibleSection>
        </TabsContent>

        <TabsContent value="records">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Records</h3>
            <p className="text-muted-foreground">View and manage existing records</p>
          </div>
        </TabsContent>

        <TabsContent value="visual">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Visual</h3>
            <p className="text-muted-foreground">Data visualization and charts</p>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Settings</h3>
            <p className="text-muted-foreground">Configuration and preferences</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;