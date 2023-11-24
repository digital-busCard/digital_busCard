import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const CommonStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    suggestionContainer: {
        marginTop: '5%'
    },
    header: {
      width: '100%',
      alignItems: "left",
      marginVertical: '10%',
      padding: 30
    },
    main: {
      flex: 1,
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    primaryMedia: {
      height: 50
    },
    primaryButton: {
      width:'100%', 
      height: 50
    },
    primaryLabel: {
      fontSize: 20, 
      fontWeight:'bold'
    },
    title: {
      fontSize: 40,
      fontWeight: "bold",
    },
    suggestion: {
        fontSize: 20
    },
    subtitle: {
      fontSize: 36,
      color: "#38434D",
    },
    lottie: {
      width: '100%',
    },
    footer: {
      width: '100%',
      padding: 30
    }
  });
  
  export const TutorialStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    suggestionContainer: {
        marginTop: '5%',
        width: '100%',
        alignItems: "center",
        marginBottom: '20%',
        flex: 1
    },
    purchaseContainer: {
        height: 30,
        alignItems: "left",
        marginBottom: '20%',
        flex: 5,
    },
    header: {
      flexDirection: 'row',
      width: '100%',
      alignItems: "left",
      marginTop: '15%',
      padding: 20,
      flex: 1
    },
    grid: {
        flexDirection: 'row',
        width: '100%',
        alignItems: "left",
        flex: 1
      },
    titleContainer: {
        flex: 5,
        paddingLeft: '5%'
    },
    backContainer: {
        flex: 1,
    },
    main: {
      flex: 1,
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    loop: {
        flex: 5,
        width: '90%',
        alignItems: "center",
    },
    primaryMedia: {
      height: 50
    },
    primaryButton: {
      width:'100%', 
      height: 50
    },
    headButton: {
        width:'100%', 
        height: 50,
        borderRadius: 20
    },
    expandedButton: {
        width:'100%', 
        height: 50,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    listButton: {
        height: 40,
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center'
    },
    inferiorContainer: {
        paddingTop: 20,
        height: 20,
        flex: 1,
        textAlign: 'center',
    },
    primaryLabel: {
      fontSize: 20, 
      fontWeight:'bold'
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
    },
    page: {
        textAlign: 'center',
    },
    suggestion: {
        fontSize: 15,
        padding: 2
    },
    subtitle: {
      fontSize: 36,
      color: "#38434D",
    },
    lottie: {
      width: '100%',
      borderRadius: 20,
      flex: 1,
      maxWidth: '100%'
    },
    maxWidth: {
        width: '100%',
        flex: 1,
    },
    footer: {
      flex: 2,
      width: '100%',
      padding: 20,
    },
    collapsed: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderLeftColor: Colors.primary,
        borderLeftWidth: 1,
        borderBottomLeftRadius: 20,
        borderRightColor: Colors.primary,
        borderRightWidth: 1,
        borderBottomRightRadius: 20,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 1,
    },
    inferiorText: {
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
  });