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
      backgroundColor: Colors.primary,
      width: '100%',
      alignItems: "left",
      padding: 40,
      paddingTop: 60,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      shadowColor: Colors.primary,
      shadowOffset: {
      width: 5,
	  height: 14,
},
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
    },
    main: {
      flex: 1,
      maxWidth: 960,
      marginHorizontal: "auto",
    },
    primaryMedia: {
      marginTop: 20,
      height: 50
    },
    primaryButton: {
      width:'100%', 
      height: 50,
      shadowColor: Colors.primary,
      shadowOffset: {
      width: 5,
	  height: 14,
},
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
    },
    primaryLabel: {
      fontSize: 20, 
      fontWeight:'bold'
    },
    title: {
      color: Colors.white,
      fontSize: 40,
      fontWeight: "bold",
    },
    suggestion: {
        fontSize: 20,
        color: Colors.white,
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
        width: '90%',
        alignItems: "center",
        marginBottom: '20%',
        flex: 2,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 20, 
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        color: Colors.white,
        shadowColor: Colors.primary,
        shadowOffset: {
        width: 5,
        height: 14,
  },
       shadowOpacity: 0.43,
       shadowRadius: 9.51,
    },
    purchaseContainer: {
        flex: 5,
        flexShrink: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    header: {
      backgroundColor: Colors.primary,
      flexDirection: 'row',
      width: '100%',
      alignItems: "left",
      padding: 20,
      paddingTop: 60,
      flex: 1,
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
      marginBottom: 20,
      shadowColor: Colors.primary,
      shadowOffset: {
      width: 5,
	  height: 14,
},
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
    },
    grid: {
        flexDirection: 'row',
        width: '90%',
        alignItems: "left",
        flex: 1,
      },
    titleContainer: {
        flex: 5,
        flexShrink: 1,
        paddingLeft: '5%',
        flexDirection: "row",
        flexWrap: "wrap",
        color: Colors.white
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
    answer: {
        width: '80%',
        padding: 30,
        flex: 3,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: Colors.primary,
        shadowColor: Colors.line,
        shadowOffset: {
        width: 5,
        height: 5,
  },
       shadowOpacity: 10.43,
       shadowRadius: 3.51,
    },
    primaryButton: {
      width:'100%', 
      height: 50,
      shadowColor: Colors.primary,
      shadowOffset: {
      width: 5,
	  height: 14,
},
     shadowOpacity: 0.43,
     shadowRadius: 9.51,
    },
    headButton: {
        width:'100%', 
        height: 50,
        borderRadius: 20,
        shadowColor: Colors.primary,
        shadowOffset: {
        width: 5,
        height: 14,
  },
       shadowOpacity: 0.43,
       shadowRadius: 9.51,
    },
    expandedButton: {
        width:'100%', 
        height: 50,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    listButton: {
        height: 50,
        width: '100%',
        flex: 1,
        justifyContent: 'center',
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
      flexShrink: 1,
      fontWeight: "bold",
      color: Colors.white
    },
    question: {
        color: 'black',
        paddingTop: 25,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 14
    },
    subQuestion: {
        color: 'black',
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 14
    },
    page: {
        color: Colors.white,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    suggestion: {
        width: '100%',
        fontSize: 16,
        flexShrink: 1,
        textAlign: 'center',
        color: 'white'
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
    list: {
        borderRadius: 20,
        backgroundColor: Colors.primary,
        width: '90%',
        flex: 8,
        overflow: 'hidden',
        shadowColor: Colors.green,
        shadowOffset: {
        width: 5,
        height: 14,
  },
       shadowOpacity: 0.43,
       shadowRadius: 9.51,
    },
    legendContainer: {
        paddingLeft: 20,
        width: '90%',
        flex: 1,
        backgroundColor: Colors.primary,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        shadowColor: Colors.primary,
        shadowOffset: {
        width: 5,
        height: 14,
  },
       shadowOpacity: 0.43,
       shadowRadius: 9.51,
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
    },
  });