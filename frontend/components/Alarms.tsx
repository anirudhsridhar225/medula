// import { Text, View } from 'react-native';
// import { getAlarmState, getAllAlarms, disableAlarm, enableAlarm } from "@/components/alarms/alarm";
// import AlarmView from '@/components/alarms/AlarmView';
// import React, { useEffect, useState } from 'react';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
//
// interface Alarm {
//     uid: string;
//     title: string;
//     hour: number;
//     minutes: number;
//     days: number[];
//     active: boolean;
// }
//
// type RootStackParamList = {
//     Ring: { alarmUid: string };
//     Edit: { alarm: Alarm };
//     Home: undefined;
// };
//
// type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
//
// interface Props {
//     navigation: NavigationProp;
// }
//
// export default function AlarmScreen({ navigation }: Props) {
//     const [alarms, setAlarms] = useState<Alarm[] | null>(null);
//     const [scheduler, setScheduler] = useState<NodeJS.Timer | null>(null);
//
//     useEffect(() => {
//         const focusListener = navigation.addListener('focus', async () => {
//             try {
//                 const fetchedAlarms: Alarm[] = await getAllAlarms();
//                 setAlarms(fetchedAlarms);
//                 const interval = setInterval(fetchState, 10000);
//                 setScheduler(interval);
//             } catch (error) {
//                 console.error('Error fetching alarms:', error);
//                 setAlarms(null);
//             }
//         });
//
//         const blurListener = navigation.addListener('blur', () => {
//             if (scheduler) {
//                 clearInterval(scheduler);
//             }
//         });
//
//         fetchState();
//
//         return () => {
//             focusListener();
//             blurListener();
//             if (scheduler) {
//                 clearInterval(scheduler);
//             }
//         };
//     }, []);
//
//     async function fetchState(): Promise<void> {
//         const alarmUid = await getAlarmState();
//         if (alarmUid) {
//             navigation.navigate('Ring', { alarmUid });
//         }
//     }
//
//     return (
//         <View style={globalStyles.container}>
//             <View style={globalStyles.innerContainer}>
//                 {alarms && alarms.length === 0 && <Text>No alarms</Text>}
//                 {alarms &&
//                     alarms.map((a: Alarm) => (
//                         <AlarmView
//                             key={a.uid}
//                             uid={a.uid}
//                             onChange={async (active: boolean) => {
//                                 if (active) {
//                                     await enableAlarm(a.uid);
//                                 } else {
//                                     await disableAlarm(a.uid);
//                                 }
//                             }}
//                             onPress={() => navigation.navigate('Edit', { alarm: a })}
//                             title={a.title}
//                             hour={a.hour}
//                             minute={a.minutes}
//                             days={a.days}
//                             isActive={a.active}
//                         />
//                     ))}
//             </View>
//         </View>
//     );
// }