import PublicationList from "../components/Publications/PublicationList";

const PUBLICATIONS = [
  {
    id: "641d1308565936c8cbad5ff1",
    fileName: "NetSquid.json",
    title: "NetSquid, a NETwork Simulator for QUantum",
    abstract:
      "In order to bring quantum networks into the real world, we would like to determine the requirements of quantum network protocols including the underlying quantum hardware. Because detailed architecture proposals are generally too complex for mathematical analysis, it is natural to employ numerical simulation. Here we introduce NetSquid, the NETwork Simulator for QUantum Information using Discrete events, a discrete-event based platform for simulating all aspects of quantum networks and modular quantum computing systems, ranging from the physical layer and its control plane up to the application level. We study several use cases to showcase NetSquid\u2019s power, including detailed physical layer simula- tions of repeater chains based on nitrogen vacancy centres in diamond as well as atomic ensembles. We also study the control plane of a quantum switch beyond its analytically known regime, and showcase NetSquid\u2019s ability to investigate large networks by simulating entanglement distribution over a chain of up to one thousand nodes.",
    pages: 15,
    authors: ["author1", "author2", "author3"],
    keywords: ["keyword1", "keyword2", "keyword3"],
    image:
      "https://accessibility.huit.harvard.edu/sites/hwpi.harvard.edu/files/styles/os_files_large/public/online-accessibility-huit/files/symbols-document-conversion_-_docs.png?m=1670263149&itok=OxIL9JXZ",
    pdf_link:
      "https://drive.google.com/file/d/1gZQuB6hDdRCZ5RCW-M3CwTJtlG7EsS2e/view?usp=sharing",
  },
  {
    id: "641d130b565936c8cbad5ff3",
    fileName: "multi_agent.json",
    title:
      "This paper introduces a multi-agent approach to adjust trafﬁc lights based on trafﬁc situation in order to reduce average delay",
    pages: 7,
    authors: ["author1", "author2", "author3"],
    keywords: ["keyword1", "keyword2", "keyword3"],
    abstract:
      "In order to bring quantum networks into the real world, we would like to determine the requirements of quantum network protocols including the underlying quantum hardware. Because detailed architecture proposals are generally too complex for mathematical analysis, it is natural to employ numerical simulation. Here we introduce NetSquid, the NETwork Simulator for QUantum Information using Discrete events, a discrete-event based platform for simulating all aspects of quantum networks and modular quantum computing systems, ranging from the physical layer and its control plane up to the application level. We study several use cases to showcase NetSquid\u2019s power, including detailed physical layer simula- tions of repeater chains based on nitrogen vacancy centres in diamond as well as atomic ensembles. We also study the control plane of a quantum switch beyond its analytically known regime, and showcase NetSquid\u2019s ability to investigate large networks by simulating entanglement distribution over a chain of up to one thousand nodes.",
    image:
      "https://accessibility.huit.harvard.edu/sites/hwpi.harvard.edu/files/styles/os_files_large/public/online-accessibility-huit/files/symbols-document-conversion_-_docs.png?m=1670263149&itok=OxIL9JXZ",
    pdf_link:
      "https://drive.google.com/file/d/1CVgatCGZuqVJnj94YzqMDpKCpsKP0ZKy/view?usp=sharing",
  },
  {
    id: "641d1311565936c8cbad5ff5",
    fileName: "NetSquid.json",
    title: "NetSquid, a NETwork Simulator for QUantum",
    abstract:
      "In order to bring quantum networks into the real world, we would like to determine the requirements of quantum network protocols including the underlying quantum hardware. Because detailed architecture proposals are generally too complex for mathematical analysis, it is natural to employ numerical simulation. Here we introduce NetSquid, the NETwork Simulator for QUantum Information using Discrete events, a discrete-event based platform for simulating all aspects of quantum networks and modular quantum computing systems, ranging from the physical layer and its control plane up to the application level. We study several use cases to showcase NetSquid\u2019s power, including detailed physical layer simula- tions of repeater chains based on nitrogen vacancy centres in diamond as well as atomic ensembles. We also study the control plane of a quantum switch beyond its analytically known regime, and showcase NetSquid\u2019s ability to investigate large networks by simulating entanglement distribution over a chain of up to one thousand nodes.",
    pages: 15,
    authors: ["author1", "author2", "author3"],
    keywords: ["keyword1", "keyword2", "keyword3"],
    image:
      "https://accessibility.huit.harvard.edu/sites/hwpi.harvard.edu/files/styles/os_files_large/public/online-accessibility-huit/files/symbols-document-conversion_-_docs.png?m=1670263149&itok=OxIL9JXZ",
    pdf_link:
      "https://drive.google.com/file/d/1gZQuB6hDdRCZ5RCW-M3CwTJtlG7EsS2e/view?usp=sharing",
  },
  {
    id: "641d1313565936c8cbad5ff7",
    fileName: "multi_agent.json",
    title:
      "This paper introduces a multi-agent approach to adjust trafﬁc lights based on trafﬁc situation in order to reduce average delay",
    pages: 7,
    authors: ["author1", "author2", "author3"],
    keywords: ["keyword1", "keyword2", "keyword3"],
    abstract:
      "In order to bring quantum networks into the real world, we would like to determine the requirements of quantum network protocols including the underlying quantum hardware. Because detailed architecture proposals are generally too complex for mathematical analysis, it is natural to employ numerical simulation. Here we introduce NetSquid, the NETwork Simulator for QUantum Information using Discrete events, a discrete-event based platform for simulating all aspects of quantum networks and modular quantum computing systems, ranging from the physical layer and its control plane up to the application level. We study several use cases to showcase NetSquid\u2019s power, including detailed physical layer simula- tions of repeater chains based on nitrogen vacancy centres in diamond as well as atomic ensembles. We also study the control plane of a quantum switch beyond its analytically known regime, and showcase NetSquid\u2019s ability to investigate large networks by simulating entanglement distribution over a chain of up to one thousand nodes.",
    image:
      "https://accessibility.huit.harvard.edu/sites/hwpi.harvard.edu/files/styles/os_files_large/public/online-accessibility-huit/files/symbols-document-conversion_-_docs.png?m=1670263149&itok=OxIL9JXZ",
    pdf_link:
      "https://drive.google.com/file/d/1CVgatCGZuqVJnj94YzqMDpKCpsKP0ZKy/view?usp=sharing",
  },
];

export default function Publications() {
  return (
    <main>
      <PublicationList />
    </main>
  );
}
