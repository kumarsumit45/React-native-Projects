import { Formik } from "formik";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// form validation
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, "Should be min of 4 chaaracters")
    .max(16, "Should be max of 16 chaaracters")
    .required("Length is required"),
});
export default function Index() {
  const [password, setPassword] = useState("");
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbol, setSymbol] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let charaterList = "";

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()_+";

    if (uppercase) {
      charaterList += upperCaseChars;
    }
    if (lowercase) {
      charaterList += lowerCaseChars;
    }
    if (numbers) {
      charaterList += digitChars;
    }
    if (symbol) {
      charaterList += specialChars;
    }

    const passwordResult = createPassword(charaterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setPassword("");
    setIsPassGenerated(false);
    setLowercase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbol(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength : ''}}
            validationSchema={PasswordSchema}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={ values =>{
              generatePasswordString(+values.passwordLength)
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
              /* and other goodies */
            }) => (
            <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.heading}>Password Length</Text>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.errorText}>
                    {errors.passwordLength}
                  </Text>
                )}
                
              </View>
              <TextInput
                style={styles.inputStyle}
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                placeholder="Ex.8"
                keyboardType="numeric"
                />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Includes lowercase</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={lowercase}
              onPress={()=> setLowercase(!lowercase)}
              fillColor="#29AB87"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Includes Uppercase</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={uppercase}
              onPress={()=> setUpperCase(!uppercase)}
              fillColor="#bce04dff"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Includes Numbers</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={numbers}
              onPress={()=> setNumbers(!numbers)}
              fillColor="#e5971aff"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Includes Symbols</Text>
              <BouncyCheckbox 
              disableBuiltInState
              isChecked={symbol}
              onPress={()=> setSymbol(!symbol)}
              fillColor="#10b3e0ff"
              />
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity
              disabled={!isValid}
              style={styles.primaryBtn}
              onPress={()=>handleSubmit()}
              >
                <Text style={styles.primaryBtnTxt}>Generate Password</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.secondaryBtn}
              onPress={()=> {
                handleReset();
                resetPasswordState()
              }}
              >
                <Text style={styles.secondaryBtnTxt}>Reset</Text>
              </TouchableOpacity>
            </View>
            </>
            )}
          </Formik>
        </View>
        {
          isPassGenerated?(
            <View style={[styles.card,styles.cardElevated]}>
              <Text style={styles.subTitle}> Result : </Text>
              <Text style={styles.description}>Long press to copy </Text>
              <Text selectable={true} style={styles.generatedPassword}>{password} </Text>
            </View>
          ):null
        }
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor:"#dddddd"
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 2,
  },
  description: {
    color: "#758283",
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  inputColumn: {
    flexDirection: "column",
  },
  inputStyle: {
    padding: 8,
    width: "30%",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#16213e",
  },
  errorText: {
    fontSize: 12,
    color: "#ff0d10",
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "center",
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#5DA3FA",
  },
  primaryBtnTxt: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: "#CAD5E2",
  },
  secondaryBtnTxt: {
    textAlign: "center",
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: "#ffffff",
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: "center",
    marginBottom: 12,
    color: "#000",
  },
});
