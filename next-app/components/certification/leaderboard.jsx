"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// import { format } from "date-fns";
import { useActiveAccount } from "thirdweb/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, BadgeIcon as Certificate } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function Leaderboard() {
  const account = useActiveAccount();
  const [activeTab, setActiveTab] = useState("scores");
  const [scores, setScores] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Fetch scores and certificates
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [scoresRes, certificatesRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leaderboard`,{
            params: { walletAddress: account?.address },
          }),
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificate`, {
            params: { walletAddress: account?.address },
          }),
        ]);

        setScores(scoresRes.data);
        setCertificates(certificatesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (account?.address) {
      fetchData();
    }
  }, [account]);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
    setShowCertificateModal(true);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex justify-between items-center py-2">
          <Skeleton className="w-32 h-8" />
          <Skeleton className="w-24 h-6" />
        </div>
      ))}
    </div>
  );

  console.log(certificates);

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl">
      <h2 className="mb-4 font-bold text-2xl">Leaderboard</h2>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>
        <TabsContent value="scores">
          <ScrollArea className="p-4 border rounded-md w-full h-[400px]">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              scores?.map((score, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex justify-between items-center py-2 border-b last:border-b-0 ${
                    score.walletAddress === account?.address ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <div>
                      <span className="font-semibold text-black">
                        {score.walletAddress === account?.address
                          ? "You"
                          : `User ${index + 1}`}
                      </span>
                      <p className="text-gray-500 text-xs">
                        {/* {format(new Date(score.date), "MMM d, yyyy")} */}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">{score.wpm} WPM</span>
                    <span className="mx-2">|</span>
                    <span>{score.accuracy}% accuracy</span>
                  </div>
                </motion.div>
              ))
            )}
          </ScrollArea>
        </TabsContent>
        <TabsContent value="certificates">
          <ScrollArea className="p-4 border rounded-md w-full h-[400px]">
            {loading ? (
              <LoadingSkeleton />
            ) : certificates?.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No certificates earned yet. Complete typing tests to earn
                certificates!
              </div>
            ) : (
              certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleCertificateClick(cert)}
                  className="flex justify-between items-center hover:bg-gray-50 py-2 border-b last:border-b-0 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Certificate className="w-5 h-5 text-blue-500" />
                    <div>
                      <span className="font-semibold text-black">
                        Typing Certificate
                      </span>
                      <p className="text-gray-500 text-xs">
                        WPM: {cert.context.wpm} | Accuracy:{" "}
                        {cert.context.accuracy}%
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-600 text-sm">
                    {/* {format(new Date(cert.date), "MMM d, yyyy")} */}
                  </div>
                </motion.div>
              ))
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      <Dialog
        open={showCertificateModal}
        onOpenChange={setShowCertificateModal}
      >
        <DialogContent className="max-w-3xl text-center">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">
                  {selectedCertificate.name}
                </DialogTitle>
              </DialogHeader>
              <div className="p-4">
                <img
                  src={selectedCertificate.url}
                  alt="Certificate"
                  className="shadow-lg rounded-lg w-full"
                />
                {/* <div className="mt-4 text-center">
                <Button 
                onClick={() => window.open(selectedCertificate.url, '_blank')}
                className="bg-blue-500 hover:bg-blue-600"
                >
                  Download Certificate
                </Button>
                </div> */}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
