import { Injectable } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Logger } from '@nestjs/common';

// Importação dos modelos
import { Profile, ProfileDocument } from '../profile/schemas/profile.schema';
import { Skill, SkillDocument } from '../skills/schemas/skill.schema';
import { Project, ProjectDocument } from '../projects/schemas/project.schema';
import { Service, ServiceDocument } from '../services/schemas/service.schema';
import { Experience, ExperienceDocument } from '../experience/schemas/experience.schema';

@Command({ name: 'seed', description: 'Seed database with initial data' })
@Injectable()
export class SeedCommand extends CommandRunner {
  private readonly logger = new Logger(SeedCommand.name);

  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
    @InjectModel(Experience.name) private experienceModel: Model<ExperienceDocument>,
  ) {
    super();
  }

  async run(passedParams: string[]): Promise<void> {
    this.logger.log('Starting database seeding...');
    
    try {
      await this.seedDatabase();
      this.logger.log('Database seeding completed successfully');
    } catch (error) {
      this.logger.error(`Database seeding failed: ${error.message}`);
      throw error;
    }
  }

  private async seedDatabase(): Promise<void> {
    // Limpar coleções existentes
    this.logger.log('Clearing existing collections...');
    await this.profileModel.deleteMany({});
    await this.skillModel.deleteMany({});
    await this.projectModel.deleteMany({});
    await this.serviceModel.deleteMany({});
    await this.experienceModel.deleteMany({});
    
    // Seed para Profile
    this.logger.log('Seeding profile data...');
    const profile = await this.profileModel.create({
      name: "Natan Gonçalves Reis",
      role: "Engenheiro de Software Fullstack e Mobile",
      avatarUrl: "https://github.com/froites.png",
      coverUrl: "/images/profile-cover.jpg",
      location: "Palmas, Tocantins, Brasil",
      email: "natangon10@gmail.com",
      phone: "+55 63 98117-7856",
      summary: "Engenheiro de Software Fullstack e Mobile com mais de 4 anos de experiência em desenvolvimento de aplicações escaláveis para empresas nacionais e internacionais. Especialista em JavaScript/TypeScript, React, Angular, Node.js e frameworks mobile. Experiência com microsserviços, integrações de pagamento, automação com IA, e metodologias ágeis. Histórico comprovado de entrega de soluções que aumentam performance, conversão de vendas e retenção de usuários.",
      socialLinks: {
        github: "https://github.com/froites",
        linkedin: "https://linkedin.com/in/natangoncalves"
      }
    });
    
    // Seed para Skills
    this.logger.log('Seeding skills data...');
    const skills = await this.skillModel.insertMany([
      {
        name: "JavaScript",
        icon: "FaJs",
        level: 90,
        color: "#f0db4f",
        category: "frontend",
        connections: ["React", "Angular", "Node.js", "TypeScript"]
      },
      {
        name: "TypeScript",
        icon: "SiTypescript",
        level: 85,
        color: "#3178C6",
        category: "frontend",
        connections: ["JavaScript", "React", "Angular", "Node.js"]
      },
      {
        name: "React",
        icon: "FaReact",
        level: 90,
        color: "#61DBFB",
        category: "frontend",
        connections: ["JavaScript", "TypeScript", "Context API", "Next.js"]
      },
      {
        name: "Angular",
        icon: "FaAngular",
        level: 85,
        color: "#DD0031",
        category: "frontend",
        connections: ["TypeScript", "JavaScript", "RxJS"]
      },
      {
        name: "Next.js",
        icon: "SiNextdotjs",
        level: 80,
        color: "#000000",
        category: "frontend",
        connections: ["React", "JavaScript", "TypeScript"]
      },
      {
        name: "HTML",
        icon: "FaHtml5",
        level: 95,
        color: "#e34c26",
        category: "frontend",
        connections: ["CSS", "JavaScript"]
      },
      {
        name: "CSS",
        icon: "FaCss3Alt",
        level: 90,
        color: "#264de4",
        category: "frontend",
        connections: ["HTML", "Tailwind CSS", "Styled Components"]
      },
      {
        name: "Tailwind CSS",
        icon: "SiTailwindcss",
        level: 85,
        color: "#38B2AC",
        category: "frontend",
        connections: ["CSS", "HTML", "React", "Angular"]
      },
      {
        name: "Styled Components",
        icon: "SiStyledcomponents",
        level: 85,
        color: "#DB7093",
        category: "frontend",
        connections: ["CSS", "React", "JavaScript"]
      },
      {
        name: "Node.js",
        icon: "FaNodeJs",
        level: 85,
        color: "#3c873a",
        category: "backend",
        connections: ["JavaScript", "Express", "Microsserviços"]
      },
      {
        name: "Express",
        icon: "SiExpress",
        level: 80,
        color: "#000000",
        category: "backend",
        connections: ["Node.js", "JavaScript", "REST API"]
      },
      {
        name: "Python",
        icon: "FaPython",
        level: 75,
        color: "#3776AB",
        category: "backend",
        connections: ["FastAPI", "IA"]
      },
      {
        name: "FastAPI",
        icon: "SiFastapi",
        level: 70,
        color: "#009688",
        category: "backend",
        connections: ["Python", "REST API", "Microsserviços"]
      },
      {
        name: "Laravel",
        icon: "FaLaravel",
        level: 65,
        color: "#f9322c",
        category: "backend",
        connections: ["PHP", "REST API"]
      },
      {
        name: "React Native",
        icon: "SiReact",
        level: 80,
        color: "#61DBFB",
        category: "mobile",
        connections: ["React", "JavaScript", "TypeScript"]
      },
      {
        name: "Ionic",
        icon: "SiIonic",
        level: 75,
        color: "#3880FF",
        category: "mobile",
        connections: ["Angular", "TypeScript", "JavaScript"]
      },
      {
        name: "Docker",
        icon: "FaDocker",
        level: 75,
        color: "#2496ED",
        category: "devops",
        connections: ["Kubernetes", "CI/CD", "Microsserviços"]
      },
      {
        name: "GitHub Actions",
        icon: "SiGithubactions",
        level: 80,
        color: "#2088FF",
        category: "devops",
        connections: ["CI/CD", "Git", "Automação"]
      }
    ]);
    
    // Seed para Projects
    this.logger.log('Seeding projects data...');
    await this.projectModel.insertMany([
      {
        title: "Sistema de Gestão Contábil",
        description: "Software de gestão contábil para o mercado americano com automação por IA para classificação de transações e integrações com QuickBooks e Stripe.",
        imageUrl: "/images/projects/accounting-system.jpg",
        bgColor: "#6772E5",
        technologies: ["Angular", "Python", "FastAPI", "Laravel", "Stripe", "IA", "Microsserviços"],
        category: "web",
        featured: true
      },
      {
        title: "Clickbus Website",
        description: "Modernização completa do site Clickbus.com.br, migrando de PHP para NextJS com foco em performance, experiência do usuário e alta conversão.",
        imageUrl: "/images/projects/clickbus.jpg",
        bgColor: "#F25F5C",
        technologies: ["NextJS", "React", "TypeScript", "BFF", "REST API", "GitHub Actions", "CI/CD"],
        category: "web",
        featured: true
      },
      {
        title: "Cresol Banking App",
        description: "Aplicativo bancário multiplataforma para Cresol com funcionalidades completas de gerenciamento financeiro, transações e interface intuitiva.",
        imageUrl: "/images/projects/cresol-app.jpg",
        bgColor: "#3880FF",
        technologies: ["Ionic", "Angular", "TypeScript", "Node.js", ".NET", "Microsserviços"],
        category: "mobile",
        featured: true
      },
      {
        title: "Shopper E-commerce",
        description: "Plataforma de e-commerce responsiva para Shopper com gerenciamento eficiente de estado e componentes reutilizáveis para rápido desenvolvimento.",
        imageUrl: "/images/projects/shopper-ecommerce.jpg",
        bgColor: "#7EC88E",
        technologies: ["React", "Node.js", "Context API", "Hooks", "Styled Components", "Axios", "GraphQL"],
        category: "web",
        featured: false
      },
      {
        title: "Design System Corporativo",
        description: "Sistema de design padronizado para aplicações corporativas, com documentação completa e componentes reutilizáveis seguindo padrões modernos.",
        imageUrl: "/images/projects/design-system.jpg",
        bgColor: "#247BA0",
        technologies: ["React", "Styled Components", "Storybook", "TypeScript", "Design Patterns"],
        category: "web",
        featured: false
      },
      {
        title: "Aplicativo de Gestão Financeira",
        description: "Aplicativo mobile para gerenciamento financeiro pessoal com dashboard visual, categorização de gastos e notificações inteligentes.",
        imageUrl: "/images/projects/finance-app.jpg",
        bgColor: "#FF8B94",
        technologies: ["React Native", "Firebase", "Node.js", "TypeScript"],
        category: "mobile",
        featured: false
      }
    ]);
    
    // Seed para Services
    this.logger.log('Seeding services data...');
    await this.serviceModel.insertMany([
      {
        title: "Desenvolvimento Web Fullstack",
        description: "Criação de aplicações web completas e escaláveis",
        icon: "FaLaptopCode",
        color: "#8257e6",
        details: [
          "Aplicações SPA com React, Angular e Next.js",
          "APIs RESTful e GraphQL",
          "Soluções e-commerce e sistemas de gestão",
          "Interfaces responsivas e acessíveis",
          "Arquitetura de microsserviços"
        ],
        technologies: ["React", "Angular", "Next.js", "Node.js", "TypeScript", "GraphQL"]
      },
      {
        title: "Desenvolvimento Mobile",
        description: "Aplicativos multiplataforma para iOS e Android",
        icon: "FaMobileAlt",
        color: "#61DBFB",
        details: [
          "Aplicativos React Native e Ionic",
          "Integração com APIs nativas",
          "Otimização de performance",
          "Publicação nas lojas App Store e Google Play",
          "Manutenção e atualizações"
        ],
        technologies: ["React Native", "Ionic", "JavaScript", "TypeScript", "API Integration"]
      },
      {
        title: "Integração de Sistemas de Pagamento",
        description: "Implementação segura de gateways de pagamento",
        icon: "FaStripeS",
        color: "#6772E5",
        details: [
          "Integração com Stripe e outras plataformas",
          "Processamento de pagamentos recorrentes",
          "Sistemas de cobrança automatizada",
          "Conformidade PCI",
          "Relatórios financeiros"
        ],
        technologies: ["Stripe", "Node.js", "React", "API Integration", "Security"]
      },
      {
        title: "Automatização com IA",
        description: "Soluções inteligentes para processos de negócio",
        icon: "FaRobot",
        color: "#F25F5C",
        details: [
          "Classificação automática de dados",
          "Assistentes virtuais personalizados",
          "Análise de documentos com ML",
          "Previsões e recomendações de negócios",
          "Integração com plataformas de IA"
        ],
        technologies: ["Python", "Machine Learning", "REST APIs", "Node.js", "Data Processing"]
      },
      {
        title: "DevOps e Infraestrutura Cloud",
        description: "Configuração de ambientes e CI/CD",
        icon: "FaCloud",
        color: "#3c873a",
        details: [
          "Pipelines de CI/CD com GitHub Actions",
          "Containerização com Docker",
          "Orquestração com Kubernetes",
          "Implantação em AWS e Azure",
          "Monitoramento e logging"
        ],
        technologies: ["Docker", "Kubernetes", "GitHub Actions", "AWS", "Azure", "CI/CD"]
      },
      {
        title: "Consultoria Técnica",
        description: "Análise e melhorias em projetos existentes",
        icon: "FaChartLine",
        color: "#9466ff",
        details: [
          "Revisão de código e arquitetura",
          "Otimização de performance",
          "Melhores práticas e padrões",
          "Migração de tecnologias legadas",
          "Mentoria para equipes"
        ],
        technologies: ["Code Review", "Performance Optimization", "Architecture", "Documentation", "Training"]
      }
    ]);
    
    // Seed para Experience
    this.logger.log('Seeding experience data...');
    await this.experienceModel.insertMany([
      {
        company: "Ambra, São Paulo - SP",
        role: "Engenheiro de Software Fullstack",
        startDate: "2023-10",
        endDate: "Atual",
        description: [
          "Lidero o desenvolvimento de software de gestão contábil com integrações ao QuickBooks e Stripe para o mercado americano",
          "Implementei arquitetura de microsserviços utilizando Python, FastAPI e Laravel para garantir escalabilidade",
          "Desenvolvi soluções de IA para automação de classificações contábeis, eliminando processos manuais",
          "Criei interfaces modernas e responsivas com Angular 16 e Tailwind CSS"
        ],
        achievements: [
          "Reduzi o tempo de processamento de dados contábeis em 40%",
          "Aumentei a precisão da classificação automática em 50%"
        ],
        technologies: ["Angular", "Python", "FastAPI", "Laravel", "Stripe", "QuickBooks", "Tailwind CSS", "IA", "Microsserviços"]
      },
      {
        company: "Clickbus, São Paulo - SP",
        role: "Engenheiro de Software Fullstack",
        startDate: "2022-06",
        endDate: "2023-02",
        description: [
          "Liderei a modernização do site clickbus.com.br, migrando de PHP 7 para NextJS",
          "Desenvolvi novas páginas com integrações BFF (Backend-For-Frontend) e APIs REST",
          "Implementei testes unitários e E2E com React Testing Library e Cypress, alcançando 90% de cobertura",
          "Automatizei processos de deploy com GitHub Actions (CI/CD) para reduzir erros de produção"
        ],
        achievements: [
          "Melhorei o tempo de carregamento em 40%",
          "Aumentei a taxa de conversão em 25%"
        ],
        technologies: ["NextJS", "React", "TypeScript", "BFF", "REST API", "React Testing Library", "Cypress", "GitHub Actions", "CI/CD", "PHP"]
      },
      {
        company: "MJV, Curitiba - PR",
        role: "Engenheiro de Software",
        startDate: "2021-04",
        endDate: "2022-06",
        description: [
          "Desenvolvi aplicações bancárias com Ionic 5 e Angular 11 para o Cresol-app",
          "Criei e mantive design system padronizado para garantir consistência visual",
          "Desenvolvi microsserviços em Node.js e .NET com foco em segurança e performance",
          "Participei ativamente de cerimônias ágeis e code reviews para garantir qualidade de código"
        ],
        achievements: [
          "Implementei 15 novos recursos que aumentaram a retenção de usuários em 20%"
        ],
        technologies: ["Ionic", "Angular", "TypeScript", "Node.js", ".NET", "Design System", "Microsserviços", "Scrum"]
      },
      {
        company: "DevSkin, Curitiba - PR",
        role: "Desenvolvedor Fullstack",
        startDate: "2020-01",
        endDate: "2021-04",
        description: [
          "Desenvolvi aplicações em ReactJS e NodeJS para a Shopper (e-commerce de alimentos)",
          "Construí interfaces responsivas utilizando Context API, Hooks e Styled Components",
          "Realizei integrações com APIs externas utilizando Axios e GraphQL",
          "Otimizei o processo de desenvolvimento com componentes reutilizáveis"
        ],
        achievements: [
          "Reduzi o tempo de desenvolvimento em 35% com implementação de biblioteca de componentes reutilizáveis"
        ],
        technologies: ["React", "Node.js", "JavaScript", "Context API", "Hooks", "Styled Components", "Axios", "GraphQL", "E-commerce"]
      }
    ]);
    
    this.logger.log('Seeding completed!');
  }
}