import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

export const POST = async (req) => {
  const inputData = await req.json();

  // Script directory
  const scriptDir = path.resolve('./scripts');

  // Ensure the directory exists
  if (!fs.existsSync(scriptDir)) {
    fs.mkdirSync(scriptDir, { recursive: true });
  }

  // Write input data to a temporary file
  const inputFilePath = path.join(scriptDir, 'input_data.json');
  fs.writeFileSync(inputFilePath, JSON.stringify(inputData));

  const pythonProcess = spawn('python', [path.resolve('./scripts/predict.py'), inputFilePath]);

  let result = '';
  let error = '';

  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    error += data.toString();
  });

  return new Promise((resolve, reject) => {
    pythonProcess.on('close', (code) => {
      fs.unlinkSync(inputFilePath);  // Delete the temporary file
      if (code !== 0) {
        console.error('Python script error:', error);
        resolve(new Response(JSON.stringify({ error: 'Error in Python script execution', details: error }), { status: 500 }));
      } else {
        try {
          console.log("Python script output:", result);  // Hata ayıklama için ekleyin
          const parsedResult = JSON.parse(result);
          resolve(new Response(JSON.stringify({ prediction: parsedResult }), { status: 200 }));
        } catch (e) {
          console.error('JSON parse error:', e);
          console.error('Raw result:', result);  // Hata ayıklama için ekleyin
          resolve(new Response(JSON.stringify({ error: 'Error parsing JSON', details: e.message }), { status: 500 }));
        }
      }
    });
  });
};
