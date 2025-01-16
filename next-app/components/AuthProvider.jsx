"use client";

import HomePage from "@/app/page";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AuthProvider = ({ children }) => {
  const account = useActiveAccount();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/checkdb/${account?.address}`
        );
        if (res.status === 200) {
          setUsername(res.data.user.username);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setShowDialog(true);
          return;
        }
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };

    if (account) {
      checkUser();
    } else {
      setLoading(false);
    }
  }, [account]);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      if (!username.trim()) {
        throw new Error("Username is required");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/create-user`,
        {
          walletAddress: account.address,
          username: username.trim(),
        }
      );
      setUsername(res.data.newUser.username);
      setShowDialog(false);
    } catch (error) {
      setError(error.response?.data?.error || error.message || "Failed to create user");
      console.error("Error creating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="border-gray-900 border-b-2 rounded-full w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!account) {
    return <HomePage />;
  }

  return (
    <div className="relative">
      <Dialog 
        open={showDialog} 
        onOpenChange={() => {}} // Disable closing by clicking outside or pressing escape
      >
        <DialogContent className="top-[50%] left-[50%] z-50 fixed translate-x-[-50%] translate-y-[-50%]">
          <DialogHeader>
            <DialogTitle>Welcome! Set Up Your Account</DialogTitle>
            <DialogDescription>
              Please choose a username to continue. This is required to use the application.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUsernameSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
                maxLength={30}
                className="w-full"
                disabled={isSubmitting}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Setting up..." : "Continue"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className={showDialog ? "pointer-events-none blur-sm" : ""}>
        {children}
      </div>
    </div>
  );
};

export default AuthProvider;