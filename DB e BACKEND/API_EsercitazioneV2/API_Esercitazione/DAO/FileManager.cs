using System;
using Spire.Doc;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using Document = Spire.Doc.Document;

namespace API_Esercitazione.DAO
{
    public class FileManager
    {
        const string WORDTemplatePath = @"C:\Users\FilibertoNencioni\source\repos\API_EsercitazioneV2\API_Esercitazione\AttestatoTemplate\Test\WORD\attestato.docx";
        public const string WORDFolderPath = @"C:\Users\FilibertoNencioni\source\repos\API_EsercitazioneV2\API_Esercitazione\Attestati\WORD\";
        public const string PDFFolderPath = @"C:\Users\FilibertoNencioni\source\repos\API_EsercitazioneV2\API_Esercitazione\Attestati\PDF\";


        public static Byte[] CreatePDFByte(string NomePartecipante, string CognomeParteciapnte, string NomeCorso, int OreCorso, string DataInizio, string NomeDocente, string CognomeDocente, int id, string cod_fiscale)
        {
            var currentSaveWord = WORDFolderPath + id + cod_fiscale + ".docx";


            using (WordprocessingDocument wordDoc = WordprocessingDocument.CreateFromTemplate(WORDTemplatePath))
            {
                var a = wordDoc.MainDocumentPart.Document;

                foreach (var text in a.Descendants<Text>()) // <<< Here
                {
                    if (text.Text.Contains("NOMS"))
                    {
                        text.Text = text.Text.Replace("NOMS", NomePartecipante);
                    }
                    if (text.Text.Contains("COGNS"))
                    {
                        text.Text = text.Text.Replace("COGNS", CognomeParteciapnte);
                    }
                    if (text.Text.Contains("NOMC"))
                    {
                        text.Text = text.Text.Replace("NOMC", NomeCorso);
                    }
                    if (text.Text.Contains("NUMORE"))
                    {
                        text.Text = text.Text.Replace("NUMORE", OreCorso.ToString());
                    }
                    if (text.Text.Contains("DTC"))
                    {
                        text.Text = text.Text.Replace("DTC", DataInizio);
                    }
                    if (text.Text.Contains("NOMD"))
                    {
                        text.Text = text.Text.Replace("NOMD", NomeDocente);
                    }
                    if (text.Text.Contains("COGND"))
                    {
                        text.Text = text.Text.Replace("COGND", CognomeDocente);
                    }
                }


                wordDoc.SaveAs(currentSaveWord).Close();
                wordDoc.Dispose();
            }

            //Thread.Sleep(1000);
            var currentSavePdf = PDFFolderPath + id + cod_fiscale + ".pdf";


            Document document = new Document();
            document.LoadFromFile(currentSaveWord);

            //Convert Word to PDF
            document.SaveToFile(currentSavePdf, FileFormat.PDF);


            return File.ReadAllBytes(currentSavePdf);
        }

    }
}
