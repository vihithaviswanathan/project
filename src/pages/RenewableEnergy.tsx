import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CollapsibleSection from "@/components/CollapsibleSection";
import FormField from "@/components/FormField";

const RenewableEnergy = () => {
  const [basicInfo, setBasicInfo] = useState({
    indicator: "",
    scopeOfData: "",
    site: "",
    dateOfReporting: "",
    reportingTimeline: "",
    to: "",
    personnelResponsible: "",
    dataOwner: "",
    dataSheetsFilledBy: "",
    dataSheetsApprovedBy: ""
  });

  const [energyReduction, setEnergyReduction] = useState({
    unitOperation: "",
    projectDetails: "",
    proposedProject: "",
    investmentRequired: "",
    typeOfEnergy: "",
    actualEnergyConsumption: "",
    projectedEnergyConsumption: ""
  });

  return (
    <div className="flex-1 p-6 space-y-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Renewable Energy</h1>
        <p className="text-muted-foreground">Manage renewable energy data and reporting</p>
      </div>

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
                label="Indicator"
                value={basicInfo.indicator}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, indicator: value }))}
              />
              <FormField
                label="Scope of data"
                value={basicInfo.scopeOfData}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, scopeOfData: value }))}
              />
              <FormField
                label="Site"
                value={basicInfo.site}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, site: value }))}
              />
              <FormField
                label="Date of Reporting"
                type="date"
                placeholder="08th July, 2025"
                value={basicInfo.dateOfReporting}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, dateOfReporting: value }))}
              />
              <FormField
                label="Reporting Timeline"
                type="date"
                placeholder="08th July, 2025"
                value={basicInfo.reportingTimeline}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, reportingTimeline: value }))}
              />
              <FormField
                label="To"
                type="date"
                placeholder="08th July, 2025"
                value={basicInfo.to}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, to: value }))}
              />
              <FormField
                label="Personnel Responsible for Data"
                value={basicInfo.personnelResponsible}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, personnelResponsible: value }))}
              />
              <FormField
                label="Data owner and designation"
                value={basicInfo.dataOwner}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, dataOwner: value }))}
              />
              <FormField
                label="Data sheets filled by and designation"
                value={basicInfo.dataSheetsFilledBy}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, dataSheetsFilledBy: value }))}
              />
              <FormField
                label="Data sheets approved by and designation"
                value={basicInfo.dataSheetsApprovedBy}
                onChange={(value) => setBasicInfo(prev => ({ ...prev, dataSheetsApprovedBy: value }))}
              />
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-primary hover:bg-primary/90">Save & Continue</Button>
            </div>
          </CollapsibleSection>

          {/* Annual Energy and GHG Emission Reduction Section */}
          <CollapsibleSection title="Annual energy and GHG emission reduction">
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-muted px-3 py-1 rounded text-sm">09-07-2025</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="Unit operation"
                  value={energyReduction.unitOperation}
                  onChange={(value) => setEnergyReduction(prev => ({ ...prev, unitOperation: value }))}
                />
                <FormField
                  label="Project Details"
                  value={energyReduction.projectDetails}
                  onChange={(value) => setEnergyReduction(prev => ({ ...prev, projectDetails: value }))}
                />
                <FormField
                  label="Proposed Project Commencement date"
                  value={energyReduction.proposedProject}
                  onChange={(value) => setEnergyReduction(prev => ({ ...prev, proposedProject: value }))}
                />
                <FormField
                  label="Investment required"
                  value={energyReduction.investmentRequired}
                  onChange={(value) => setEnergyReduction(prev => ({ ...prev, investmentRequired: value }))}
                />
                <FormField
                  label="Type of Energy Saved (electricity, fuel or steam)"
                  value={energyReduction.typeOfEnergy}
                  onChange={(value) => setEnergyReduction(prev => ({ ...prev, typeOfEnergy: value }))}
                />
                <FormField
                  label="Actual Energy Consumption"
                  value={energyReduction.actualEnergyConsumption}
                  onChange={(value) => setEnergyReduction(prev => ({ ...prev, actualEnergyConsumption: value }))}
                />
                <FormField
                  label="Projected Energy Consumption (as per BAU)"
                  value={energyReduction.projectedEnergyConsumption}
                  onChange={(value) => setEnergyReduction(prev => ({ ...prev, projectedEnergyConsumption: value }))}
                />
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
            <p className="text-muted-foreground">View and manage renewable energy records</p>
          </div>
        </TabsContent>

        <TabsContent value="visual">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Visual</h3>
            <p className="text-muted-foreground">Renewable energy data visualization</p>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">Settings</h3>
            <p className="text-muted-foreground">Renewable energy configuration</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RenewableEnergy;