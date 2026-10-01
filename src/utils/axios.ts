
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3JvdW5kLTEzLWN1cmUuaHVtYS12b2x2ZS5jb20vYXBpL2F1dGgvbG9naW4vdmVyaWZ5IiwiaWF0IjoxNzkwNzYwNDMxLCJleHAiOjQ3OTA3NjA0MzEsIm5iZiI6MTc5MDc2MDQzMSwianRpIjoieXM1aWdsdkF6TEFQQ2tUMiIsInN1YiI6IjAxYTBlZTg5LWViODQtNzMyOS1hYWVlLTk3ODI5OWE0MGI4MCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.uBNl1cTgQjASGMxFKbUMZKvtIF2VfVsxXNX12ObaYGI'
// const TOKEN=localStorage.getItem('access_token');

export const api =axios.create({
    baseURL:BASE_URL,
    headers:{
    "Content-Type": "application/json",
    "Authorization":`Bearer ${TOKEN}`
    }

})