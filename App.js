import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const questions = [
    { q: "Apa bahasa Inggrisnya 'Kucing'?", a: "cat" },
    { q: "Apa bahasa Inggrisnya 'Buku'?", a: "book" },
    { q: "Apa bahasa Inggrisnya 'Air'?", a: "water" }
  ];

  const speak = (text) => {
    Speech.speak(text, { language: "en" });
  };

  const checkAnswer = (answer) => {
    if (answer.toLowerCase() === questions[level - 1].a) {
      setScore(score + 10);
      setLevel(level + 1);
    }
  };

  if (screen === "login") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Belajar Bahasa Inggris Mudah</Text>
        <TextInput
          placeholder="Masukkan Nama"
          style={styles.input}
          onChangeText={setUsername}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScreen("game")}
        >
          <Text style={styles.buttonText}>Mulai</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (level > questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Selesai 🎉</Text>
        <Text>Skor Kamu: {score}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.level}>Level {level}</Text>
      <Text style={styles.question}>{questions[level - 1].q}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          speak(questions[level - 1].a);
          checkAnswer(questions[level - 1].a);
        }}
      >
        <Text style={styles.buttonText}>Jawaban Benar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  level: {
    fontSize: 18,
    marginBottom: 10
  },
  question: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});