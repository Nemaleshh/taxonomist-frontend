import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GdpCalculator = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    unemploymentRate: "",
    personalConsumption: "",
    governmentExpenditure: "",
    m1: "",
    m2: "",
    federalDebt: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const validateInputs = () => {
    const values = Object.values(inputs);
    if (values.some(value => value === "")) {
      setError("All fields are required");
      return false;
    }
    if (values.some(value => isNaN(Number(value)))) {
      setError("All values must be numbers");
      return false;
    }
    if (Number(inputs.unemploymentRate) < 0 || Number(inputs.unemploymentRate) > 100) {
      setError("Unemployment rate must be between 0 and 100");
      return false;
    }
    return true;
  };

  const calculateGDP = async () => {
    setError(null);
    if (!validateInputs()) return;

    setIsLoading(true);
    
    try {
      const payload = {
        unemployment_rate: Number(inputs.unemploymentRate),
        personal_consumption: Number(inputs.personalConsumption),
        govt_expenditure: Number(inputs.governmentExpenditure),
        m1_money_supply: Number(inputs.m1),
        m2_money_supply: Number(inputs.m2),
        federal_debt: Number(inputs.federalDebt)
      };

      const response = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "API request failed");
      }

      const data = await response.json();
      setResult(data.gdp_prediction);
    } catch (err) {
      console.error("Calculation error:", err);
      setError(err.message || "Failed to calculate GDP. Please try again.");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ 
        backgroundImage: 'url("/photo-1498050108023-c5249f4df085")',
        backgroundColor: 'rgba(255, 255, 255, 0.97)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="min-h-screen backdrop-blur-sm py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 bg-white/80 hover:bg-white/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <div className="text-xl font-semibold text-primary bg-white/80 px-4 py-2 rounded-full">
              Taxonomist
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 bg-white/90 p-8 rounded-2xl shadow-lg backdrop-blur-md"
          >
            <div>
              <h1 className="text-4xl font-bold text-primary mb-4">GDP Calculator</h1>
              <p className="text-secondary text-lg">
                Enter the economic indicators below to calculate the estimated GDP (in ₹ Crores).
              </p>
            </div>

            <div className="space-y-6">
              {Object.entries(inputs).map(([key, value]) => (
                <div key={key}>
                  <label className="text-lg font-medium mb-3 block text-primary">
                    {key.split(/(?=[A-Z])/).join(' ').replace(/M(\d)/, 'M$1 ')}
                    {key === 'unemploymentRate' && ' (%)'}
                    {!['unemploymentRate', 'm1', 'm2'].includes(key) && ' (₹ Crores)'}
                  </label>
                  <Input
                    type="number"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    step={key === 'unemploymentRate' ? "0.1" : "1"}
                    className="text-lg py-6"
                  />
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 py-8 text-lg"
              onClick={calculateGDP}
              disabled={isLoading}
            >
              <Calculator className="mr-3 h-5 w-5" />
              {isLoading ? "Calculating..." : "Calculate GDP"}
            </Button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl border border-red-200"
              >
                {error}
              </motion.div>
            )}

            {result !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-8 bg-accent rounded-xl border border-accent"
              >
                <h3 className="text-xl font-semibold mb-2 text-primary">Estimated GDP</h3>
                <p className="text-4xl font-bold text-primary">
                  ₹{result.toLocaleString()} Crores
                </p>
                <p className="mt-2 text-sm text-primary/80">
                  Model used: {result === 14000 ? "Fallback calculation" : "AI Prediction"}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GdpCalculator;