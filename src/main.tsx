import { AwsRum, AwsRumConfig } from "aws-rum-web";
(function (n, e) {
  try {
    const config: AwsRumConfig = {
      sessionSampleRate: 1,
      identityPoolId: "us-east-1:74e48c18-2856-4dc6-a115-c841fda3f523",
      endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
      telemetries: ["performance", "errors", "http"],
      allowCookies: true,
      enableXRay: false,
      signing: true, // If you have a public resource policy and wish to send unsigned requests please set this to false
    };

    const APPLICATION_ID: string = "61f1a7b0-c2ff-4222-a8ce-fd7019b2787d";
    const APPLICATION_VERSION: string = "1.0.0";
    const APPLICATION_REGION: string = "us-east-1";

    const awsRum: AwsRum = new AwsRum(
      APPLICATION_ID,
      APPLICATION_VERSION,
      APPLICATION_REGION,
      config
    );
  } catch (error) {
    // Ignore errors thrown during CloudWatch RUM web client initialization
  }
})(window, document);

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
