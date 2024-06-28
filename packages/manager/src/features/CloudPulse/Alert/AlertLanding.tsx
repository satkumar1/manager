
import { TabPanels } from "@reach/tabs";
import React from "react";
import { Box } from "src/components/Box";
import { Paper } from "src/components/Paper";
import { SafeTabPanel } from "src/components/Tabs/SafeTabPanel";
import { TabLinkList } from "src/components/Tabs/TabLinkList";
import { Tabs } from 'src/components/Tabs/Tabs';
import { Typography } from "src/components/Typography";
import { Button } from "src/components/Button/Button";
import { Drawer } from "src/components/Drawer";
import { CreateNotificationChannel } from "../NotificationTemplate/CreateNotificationChannel";


export const AlertLanding = () => {

    const tabs = [
        {
            routeName: '',
            title: 'Recent Activity',
        },
        {
            routeName: '',
            title: 'Definitions',
        },
        {
            routeName: '',
            title: 'Notification Channel',
        },
    ];

   
    const [open, setOpen] = React.useState(false);
    return (
        <Paper>
                {/* <Box sx={{ display: 'flex', flexGrow: 1 }}> */}
                    <Tabs style={{width: "100%"}}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', p: 2, width:'100%'}} id="someiD" >
                            <TabLinkList noLink tabs={tabs} />
                            <Button buttonType="primary" variant="contained" onClick={() => setOpen(true)} sx={{ marginRight: 2 }}>
                                Create Notification Channel
                            </Button>
                            <Drawer title="Create Notification Channel" onClose={() => setOpen(false)} open={open}>
                                <CreateNotificationChannel onCancel={() => setOpen(false)}/>
                            </Drawer>
                            
                        </Box> 
                        {/* <Grid container alignItems="center">
                            <Grid item xs={6} md={9} sm={6}>
                                <TabLinkList noLink tabs={tabs} />
                            </Grid>
                            <Grid item xs={3}>
                                <Button buttonType="primary" variant="contained" onClick={() => setOpen(true)} sx={{ marginRight: 2 }}>
                                    Create Notification Channel
                                </Button>
                            </Grid>
                        </Grid> */}
                        <TabPanels>
                            {tabs.map((tab, idx) => <SafeTabPanel index={idx} key={`tab-${idx}`}>
                                <Paper sx={{
                                    padding: 2
                                }}>
                                    <Typography variant="body1">Content for {tab.title}</Typography>
                                </Paper>
                            </SafeTabPanel>)}
                        </TabPanels>

                    </Tabs>
                {/* </Box> */}
        </Paper>
    )
};
