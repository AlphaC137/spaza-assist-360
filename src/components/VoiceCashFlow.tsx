import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Square } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

export const VoiceCashFlow = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks(chunks => [...chunks, e.data]);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        
        reader.onloadend = async () => {
          const base64Audio = reader.result?.toString().split(',')[1];
          if (!base64Audio) return;

          try {
            const response = await fetch('/api/voice-to-text', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ audio: base64Audio }),
            });

            if (!response.ok) throw new Error('Failed to transcribe audio');
            
            const { text } = await response.json();
            
            // Store the transcription
            const { error } = await supabase
              .from('cash_flow_notes')
              .insert([{ 
                transcription: text,
                created_at: new Date().toISOString()
              }]);

            if (error) throw error;

            toast({
              title: "Success",
              description: "Voice note recorded and transcribed successfully",
            });
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to process voice note",
              variant: "destructive",
            });
          }
        };
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      setAudioChunks([]);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Voice Navigation</h2>
      <p className="text-gray-600 mb-4">
        Record your daily cash flow details using voice notes. Speak clearly and mention amounts and descriptions.
      </p>
      <div className="flex justify-center gap-4">
        <Button
          onClick={isRecording ? stopRecording : startRecording}
          variant={isRecording ? "destructive" : "default"}
          className="w-full"
        >
          {isRecording ? (
            <>
              <Square className="w-4 h-4 mr-2" />
              Stop Recording
            </>
          ) : (
            <>
              <Mic className="w-4 h-4 mr-2" />
              Start Recording
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};