"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MusicPreview, MusicPreviewError, PlayerState } from "@/types/music";

function isMusicPreview(value: unknown): value is MusicPreview {
  if (typeof value !== "object" || value === null) return false;
  const preview = value as Partial<MusicPreview>;

  return (
    preview.source === "apple" &&
    typeof preview.artistName === "string" &&
    typeof preview.trackName === "string" &&
    typeof preview.collectionName === "string" &&
    typeof preview.previewUrl === "string" &&
    preview.previewUrl.startsWith("https://") &&
    typeof preview.appleMusicUrl === "string"
  );
}

export function useMusicPreview() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [preview, setPreview] = useState<MusicPreview | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>("loading");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playRequestPending, setPlayRequestPending] = useState(false);
  const [message, setMessage] = useState("Loading official preview…");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPreview() {
      try {
        const response = await fetch("/api/music-preview", {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload: unknown = await response.json();

        if (!response.ok || !isMusicPreview(payload)) {
          const errorPayload = payload as Partial<MusicPreviewError>;
          setPlayerState(response.status === 404 ? "unavailable" : "error");
          setMessage(errorPayload.error ?? "Preview unavailable");
          return;
        }

        setPreview(payload);
        setMessage("Preparing 30-second preview…");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setPlayerState("error");
        setMessage("Preview temporarily unavailable");
      }
    }

    void loadPreview();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !preview) return;

    const syncDuration = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handleCanPlay = () => {
      syncDuration();
      setPlayerState((state) => (state === "loading" ? "ready" : state));
      if (audio.paused) setMessage("Ready to play");
    };
    const handlePlay = () => {
      setPlayerState("playing");
      setMessage("Official preview playing");
    };
    const handlePause = () => {
      if (audio.ended) return;
      setPlayerState(audio.currentTime > 0 ? "paused" : "ready");
      setMessage(audio.currentTime > 0 ? "Preview paused" : "Ready to play");
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
      setCurrentTime(audio.duration || 30);
      setPlayerState("ended");
      setMessage("Preview complete");
    };
    const handleError = () => {
      setPlayerState("error");
      setMessage("Preview temporarily unavailable");
      setPlayRequestPending(false);
    };
    const pauseWhenHidden = () => {
      if (document.hidden && !audio.paused) audio.pause();
    };

    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    audio.src = preview.previewUrl;
    audio.load();

    return () => {
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    };
  }, [preview]);

  const togglePlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (
      !audio ||
      playRequestPending ||
      playerState === "loading" ||
      playerState === "unavailable" ||
      playerState === "error"
    ) {
      return;
    }

    if (playerState === "playing") {
      audio.pause();
      return;
    }

    setPlayRequestPending(true);
    if (audio.ended || playerState === "ended") {
      audio.currentTime = 0;
      setCurrentTime(0);
    }

    try {
      await audio.play();
    } catch {
      setPlayerState("paused");
      setMessage("Playback was blocked — tap play to retry");
    } finally {
      setPlayRequestPending(false);
    }
  }, [playRequestPending, playerState]);

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return {
    audioRef,
    preview,
    playerState,
    currentTime,
    duration,
    progress,
    playRequestPending,
    message,
    togglePlayback,
  };
}
