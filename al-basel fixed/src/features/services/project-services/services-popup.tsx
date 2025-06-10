import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TProjectsService } from ".";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

type Props = {
  services: TProjectsService["services"];
};
function ServicesPopup({ services }: Props) {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === "en";

  if (!services.length) return <div className="text-center">- - -</div>;
  return (
    <div className="text-center">
      <Dialog >
        <DialogTrigger asChild>
          <Button variant="outline">{t("show")}</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[600px] min-h-[50vh] flex flex-col items-start gap-4">
          <DialogHeader
            style={{
              direction: `${isEn ? "ltr" : "rtl"}`,
              width: "100%",
            }}
            className="mb-2"
          >
            <DialogTitle className="text-xl font-semibold">{t("show")}</DialogTitle>
          </DialogHeader>

          <Accordion type="single" collapsible className="w-full">
            {services?.map((s, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="w-full text-left font-medium">
                  <div className="flex justify-between w-full px-2">
                    <span>{s.name}</span>
                    <span className="text-muted-foreground">{s.price}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pt-2">
                  {s.materials?.map((m, k) => (
                    <div
                      key={k}
                      className="border-b border-gray-300 dark:border-gray-600 flex justify-between px-2 py-2 text-sm"
                    >
                      <span>{m.name}</span>
                      <span>{m.price}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ServicesPopup;
