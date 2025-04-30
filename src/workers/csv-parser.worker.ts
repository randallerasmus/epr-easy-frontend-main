
import Papa from 'papaparse';

self.onmessage = (e: MessageEvent) => {
  const { file } = e.data;
  
  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: (result) => {
      self.postMessage({
        data: result.data,
        errors: result.errors,
        meta: result.meta
      });
    },
    error: (error) => {
      self.postMessage({
        error: error.message
      });
    }
  });
};

export {};
