--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.5
-- Dumped by pg_dump version 9.5.1

-- Started on 2016-04-12 00:55:53

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3008 (class 1262 OID 1728717)
-- Name: d3fv5446ep00s0; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE d3fv5446ep00s0 WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


\connect d3fv5446ep00s0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12749)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 3010 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 173 (class 1259 OID 1842398)
-- Name: Category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Category" (
    "UserId" integer,
    "CategoryId" integer NOT NULL
);


--
-- TOC entry 174 (class 1259 OID 1842401)
-- Name: CategoryStatement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "CategoryStatement" (
    "CategoryId" integer,
    "StatementId" integer
);


--
-- TOC entry 175 (class 1259 OID 1842404)
-- Name: Category_CategoryId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Category_CategoryId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3011 (class 0 OID 0)
-- Dependencies: 175
-- Name: Category_CategoryId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Category_CategoryId_seq" OWNED BY "Category"."CategoryId";


--
-- TOC entry 176 (class 1259 OID 1842406)
-- Name: Rating; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Rating" (
    "UserId" integer,
    "StatementId" integer
);


--
-- TOC entry 3012 (class 0 OID 0)
-- Dependencies: 176
-- Name: TABLE "Rating"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE "Rating" IS 'Statement Rating
Links
User & Statement';


--
-- TOC entry 177 (class 1259 OID 1842409)
-- Name: Reference; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Reference" (
    "ReferenceId" integer NOT NULL,
    "UserId" integer
);


--
-- TOC entry 178 (class 1259 OID 1842412)
-- Name: Reference_ReferenceId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Reference_ReferenceId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 178
-- Name: Reference_ReferenceId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Reference_ReferenceId_seq" OWNED BY "Reference"."ReferenceId";


--
-- TOC entry 179 (class 1259 OID 1842414)
-- Name: Referencing; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Referencing" (
    "ReferencingId" integer NOT NULL,
    "ReferenceId" integer,
    "StatementId" integer,
    "UserId" integer
);


--
-- TOC entry 180 (class 1259 OID 1842417)
-- Name: Referencing_ReferencingId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Referencing_ReferencingId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 180
-- Name: Referencing_ReferencingId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Referencing_ReferencingId_seq" OWNED BY "Referencing"."ReferencingId";


--
-- TOC entry 181 (class 1259 OID 1842419)
-- Name: Statement; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Statement" (
    "StatementId" integer NOT NULL,
    "UserId" integer
);


--
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 181
-- Name: COLUMN "Statement"."StatementId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "Statement"."StatementId" IS '
';


--
-- TOC entry 182 (class 1259 OID 1842422)
-- Name: StatementTag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "StatementTag" (
    "StatementId" integer,
    "UserId" integer,
    "TagId" integer
);


--
-- TOC entry 183 (class 1259 OID 1842425)
-- Name: Statement_StatementId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Statement_StatementId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 183
-- Name: Statement_StatementId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Statement_StatementId_seq" OWNED BY "Statement"."StatementId";


--
-- TOC entry 184 (class 1259 OID 1842427)
-- Name: Tag; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Tag" (
    "TagId" integer NOT NULL
);


--
-- TOC entry 185 (class 1259 OID 1842430)
-- Name: Tag_TagId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Tag_TagId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 185
-- Name: Tag_TagId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Tag_TagId_seq" OWNED BY "Tag"."TagId";


--
-- TOC entry 186 (class 1259 OID 1842432)
-- Name: User; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "User" (
    "UserId" integer NOT NULL,
    "OtherName" character(100) NOT NULL,
    "LastName" character(50) NOT NULL,
    "EmailAddress" character varying(150) NOT NULL,
    "Password" character varying(100) NOT NULL,
    "Created" date DEFAULT now() NOT NULL,
    "Title" character(5) NOT NULL,
    "DateOfBirth" date NOT NULL,
    "Role" character varying(10) DEFAULT "current_user"() NOT NULL,
    "Username" character varying(50) NOT NULL,
    "FirstName" character(50) NOT NULL,
    "PostNominal" character(25)
);


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 186
-- Name: COLUMN "User"."UserId"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "User"."UserId" IS 'UserId - Auto Incrementing';


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 186
-- Name: COLUMN "User"."EmailAddress"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "User"."EmailAddress" IS 'User''s email address';


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 186
-- Name: COLUMN "User"."Password"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "User"."Password" IS 'User password, hashed and salted with BCrypt()';


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 186
-- Name: COLUMN "User"."Created"; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN "User"."Created" IS 'Account creation date
';


--
-- TOC entry 187 (class 1259 OID 1842435)
-- Name: User_UserId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "User_UserId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3022 (class 0 OID 0)
-- Dependencies: 187
-- Name: User_UserId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "User_UserId_seq" OWNED BY "User"."UserId";


--
-- TOC entry 188 (class 1259 OID 1842437)
-- Name: Voting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE "Voting" (
    "VotingId" integer NOT NULL,
    "UserId" integer,
    "ReferencingId" integer
);


--
-- TOC entry 189 (class 1259 OID 1842440)
-- Name: Voting_VotingId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE "Voting_VotingId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3023 (class 0 OID 0)
-- Dependencies: 189
-- Name: Voting_VotingId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE "Voting_VotingId_seq" OWNED BY "Voting"."VotingId";


--
-- TOC entry 190 (class 1259 OID 1842591)
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- TOC entry 2827 (class 2604 OID 1842442)
-- Name: CategoryId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Category" ALTER COLUMN "CategoryId" SET DEFAULT nextval('"Category_CategoryId_seq"'::regclass);


--
-- TOC entry 2828 (class 2604 OID 1842443)
-- Name: ReferenceId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Reference" ALTER COLUMN "ReferenceId" SET DEFAULT nextval('"Reference_ReferenceId_seq"'::regclass);


--
-- TOC entry 2829 (class 2604 OID 1842444)
-- Name: ReferencingId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Referencing" ALTER COLUMN "ReferencingId" SET DEFAULT nextval('"Referencing_ReferencingId_seq"'::regclass);


--
-- TOC entry 2830 (class 2604 OID 1842445)
-- Name: StatementId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Statement" ALTER COLUMN "StatementId" SET DEFAULT nextval('"Statement_StatementId_seq"'::regclass);


--
-- TOC entry 2831 (class 2604 OID 1842446)
-- Name: TagId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Tag" ALTER COLUMN "TagId" SET DEFAULT nextval('"Tag_TagId_seq"'::regclass);


--
-- TOC entry 2832 (class 2604 OID 1842447)
-- Name: UserId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "User" ALTER COLUMN "UserId" SET DEFAULT nextval('"User_UserId_seq"'::regclass);


--
-- TOC entry 2835 (class 2604 OID 1842448)
-- Name: VotingId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Voting" ALTER COLUMN "VotingId" SET DEFAULT nextval('"Voting_VotingId_seq"'::regclass);


--
-- TOC entry 2986 (class 0 OID 1842398)
-- Dependencies: 173
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2987 (class 0 OID 1842401)
-- Dependencies: 174
-- Data for Name: CategoryStatement; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3024 (class 0 OID 0)
-- Dependencies: 175
-- Name: Category_CategoryId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Category_CategoryId_seq"', 1, false);


--
-- TOC entry 2989 (class 0 OID 1842406)
-- Dependencies: 176
-- Data for Name: Rating; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2990 (class 0 OID 1842409)
-- Dependencies: 177
-- Data for Name: Reference; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3025 (class 0 OID 0)
-- Dependencies: 178
-- Name: Reference_ReferenceId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Reference_ReferenceId_seq"', 1, false);


--
-- TOC entry 2992 (class 0 OID 1842414)
-- Dependencies: 179
-- Data for Name: Referencing; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3026 (class 0 OID 0)
-- Dependencies: 180
-- Name: Referencing_ReferencingId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Referencing_ReferencingId_seq"', 1, false);


--
-- TOC entry 2994 (class 0 OID 1842419)
-- Dependencies: 181
-- Data for Name: Statement; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 2995 (class 0 OID 1842422)
-- Dependencies: 182
-- Data for Name: StatementTag; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3027 (class 0 OID 0)
-- Dependencies: 183
-- Name: Statement_StatementId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Statement_StatementId_seq"', 1, false);


--
-- TOC entry 2997 (class 0 OID 1842427)
-- Dependencies: 184
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3028 (class 0 OID 0)
-- Dependencies: 185
-- Name: Tag_TagId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Tag_TagId_seq"', 1, false);


--
-- TOC entry 2999 (class 0 OID 1842432)
-- Dependencies: 186
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO "User" VALUES (1, 'Ian Andrew                                                                                          ', 'McLeod                                            ', 'l.mcleod95@gmail.com', '$2a$08$MwlH29hddk6aOW0HxVe1beB1H4cT5OWGfemoc/yHdcijYDUgzVJQC', '2016-04-01', 'Mr   ', '1995-02-18', 'admin', 'LiamMcLeod', 'Liam                                              ', NULL);
INSERT INTO "User" VALUES (2, 'None                                                                                                ', 'Toor                                              ', 'root@localhost', '$2a$08$DDxqS.00MfkQyIRLRYN4qObROja5Q2P3IyCoSV2SLO0NsfDyDeD82', '2016-04-07', 'Dr   ', '1995-02-18', 'admin', 'root', 'Root                                              ', NULL);


--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 187
-- Name: User_UserId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"User_UserId_seq"', 1, false);


--
-- TOC entry 3001 (class 0 OID 1842437)
-- Dependencies: 188
-- Data for Name: Voting; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 189
-- Name: Voting_VotingId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('"Voting_VotingId_seq"', 1, false);


--
-- TOC entry 3003 (class 0 OID 1842591)
-- Dependencies: 190
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO session VALUES ('e3d07aa8-e98c-456c-bf79-08c04f1e170f', '{"cookie":{"originalMaxAge":1799999,"expires":"2016-04-12T00:12:52.780Z","httpOnly":true,"path":"/"},"flash":{},"loggedIn":true,"user":{"UserId":1,"OtherName":"Ian Andrew","LastName":"McLeod","EmailAddress":"l.mcleod95@gmail.com","Password":"$2a$08$MwlH29hddk6aOW0HxVe1beB1H4cT5OWGfemoc/yHdcijYDUgzVJQC","Created":"Apr 01 2016","Title":"Mr","DateOfBirth":"Feb 18 1995","Role":"admin","Username":"LiamMcLeod","FirstName":"Liam"},"profile":true}', '2016-04-12 00:12:53');


--
-- TOC entry 2837 (class 2606 OID 1842450)
-- Name: PK_Category; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Category"
    ADD CONSTRAINT "PK_Category" PRIMARY KEY ("CategoryId");


--
-- TOC entry 2840 (class 2606 OID 1842452)
-- Name: PK_Reference; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Reference"
    ADD CONSTRAINT "PK_Reference" PRIMARY KEY ("ReferenceId");


--
-- TOC entry 2845 (class 2606 OID 1842454)
-- Name: PK_Referencing; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Referencing"
    ADD CONSTRAINT "PK_Referencing" PRIMARY KEY ("ReferencingId");


--
-- TOC entry 2848 (class 2606 OID 1842456)
-- Name: PK_Statement; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Statement"
    ADD CONSTRAINT "PK_Statement" PRIMARY KEY ("StatementId");


--
-- TOC entry 2853 (class 2606 OID 1842458)
-- Name: PK_Tag; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Tag"
    ADD CONSTRAINT "PK_Tag" PRIMARY KEY ("TagId");


--
-- TOC entry 2855 (class 2606 OID 1842460)
-- Name: PK_User; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "User"
    ADD CONSTRAINT "PK_User" PRIMARY KEY ("UserId");


--
-- TOC entry 2859 (class 2606 OID 1842462)
-- Name: PK_Voting; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Voting"
    ADD CONSTRAINT "PK_Voting" PRIMARY KEY ("VotingId");


--
-- TOC entry 2861 (class 2606 OID 1842598)
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 2841 (class 1259 OID 1842463)
-- Name: FKI_Reference_Referencing; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_Reference_Referencing" ON "Referencing" USING btree ("ReferenceId");


--
-- TOC entry 2856 (class 1259 OID 1842464)
-- Name: FKI_Referencing_Voting; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_Referencing_Voting" ON "Voting" USING btree ("ReferencingId");


--
-- TOC entry 2842 (class 1259 OID 1842465)
-- Name: FKI_Statement_Referencing; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_Statement_Referencing" ON "Referencing" USING btree ("StatementId");


--
-- TOC entry 2849 (class 1259 OID 1842466)
-- Name: FKI_Statement_ST; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_Statement_ST" ON "StatementTag" USING btree ("StatementId");


--
-- TOC entry 2850 (class 1259 OID 1842467)
-- Name: FKI_Tag_ST; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_Tag_ST" ON "StatementTag" USING btree ("TagId");


--
-- TOC entry 2838 (class 1259 OID 1842468)
-- Name: FKI_User_Reference; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_User_Reference" ON "Reference" USING btree ("UserId");


--
-- TOC entry 2843 (class 1259 OID 1842469)
-- Name: FKI_User_Referencing; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_User_Referencing" ON "Referencing" USING btree ("UserId");


--
-- TOC entry 2851 (class 1259 OID 1842470)
-- Name: FKI_User_ST; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_User_ST" ON "StatementTag" USING btree ("UserId");


--
-- TOC entry 2846 (class 1259 OID 1842471)
-- Name: FKI_User_Statement; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_User_Statement" ON "Statement" USING btree ("UserId");


--
-- TOC entry 2857 (class 1259 OID 1842472)
-- Name: FKI_User_Voting; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "FKI_User_Voting" ON "Voting" USING btree ("UserId");


--
-- TOC entry 2863 (class 2606 OID 1842473)
-- Name: FK_Category_CS; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "CategoryStatement"
    ADD CONSTRAINT "FK_Category_CS" FOREIGN KEY ("CategoryId") REFERENCES "Category"("CategoryId");


--
-- TOC entry 2868 (class 2606 OID 1842478)
-- Name: FK_Reference_Referencing; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Referencing"
    ADD CONSTRAINT "FK_Reference_Referencing" FOREIGN KEY ("ReferenceId") REFERENCES "Reference"("ReferenceId");


--
-- TOC entry 2875 (class 2606 OID 1842483)
-- Name: FK_Referencing_Voting; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Voting"
    ADD CONSTRAINT "FK_Referencing_Voting" FOREIGN KEY ("ReferencingId") REFERENCES "Referencing"("ReferencingId");


--
-- TOC entry 2864 (class 2606 OID 1842488)
-- Name: FK_Statement_CS; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "CategoryStatement"
    ADD CONSTRAINT "FK_Statement_CS" FOREIGN KEY ("StatementId") REFERENCES "Statement"("StatementId");


--
-- TOC entry 2865 (class 2606 OID 1842493)
-- Name: FK_Statement_Rating; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Rating"
    ADD CONSTRAINT "FK_Statement_Rating" FOREIGN KEY ("StatementId") REFERENCES "Statement"("StatementId");


--
-- TOC entry 2869 (class 2606 OID 1842498)
-- Name: FK_Statement_Referencing; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Referencing"
    ADD CONSTRAINT "FK_Statement_Referencing" FOREIGN KEY ("StatementId") REFERENCES "Statement"("StatementId");


--
-- TOC entry 2872 (class 2606 OID 1842503)
-- Name: FK_Statement_ST; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "StatementTag"
    ADD CONSTRAINT "FK_Statement_ST" FOREIGN KEY ("StatementId") REFERENCES "Statement"("StatementId");


--
-- TOC entry 2873 (class 2606 OID 1842508)
-- Name: FK_Tag_ST; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "StatementTag"
    ADD CONSTRAINT "FK_Tag_ST" FOREIGN KEY ("TagId") REFERENCES "Tag"("TagId");


--
-- TOC entry 2862 (class 2606 OID 1842513)
-- Name: FK_User_Category; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Category"
    ADD CONSTRAINT "FK_User_Category" FOREIGN KEY ("UserId") REFERENCES "User"("UserId");


--
-- TOC entry 2866 (class 2606 OID 1842518)
-- Name: FK_User_Reference; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Rating"
    ADD CONSTRAINT "FK_User_Reference" FOREIGN KEY ("UserId") REFERENCES "User"("UserId");


--
-- TOC entry 2867 (class 2606 OID 1842523)
-- Name: FK_User_Reference; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Reference"
    ADD CONSTRAINT "FK_User_Reference" FOREIGN KEY ("UserId") REFERENCES "User"("UserId");


--
-- TOC entry 2870 (class 2606 OID 1842528)
-- Name: FK_User_Referencing; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Referencing"
    ADD CONSTRAINT "FK_User_Referencing" FOREIGN KEY ("UserId") REFERENCES "User"("UserId");


--
-- TOC entry 2874 (class 2606 OID 1842533)
-- Name: FK_User_ST; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "StatementTag"
    ADD CONSTRAINT "FK_User_ST" FOREIGN KEY ("UserId") REFERENCES "User"("UserId");


--
-- TOC entry 2871 (class 2606 OID 1842538)
-- Name: FK_User_Statement; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Statement"
    ADD CONSTRAINT "FK_User_Statement" FOREIGN KEY ("UserId") REFERENCES "User"("UserId");


--
-- TOC entry 2876 (class 2606 OID 1842543)
-- Name: FK_User_Voting; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY "Voting"
    ADD CONSTRAINT "FK_User_Voting" FOREIGN KEY ("UserId") REFERENCES "User"("UserId");


--
-- TOC entry 3009 (class 0 OID 0)
-- Dependencies: 7
-- Name: public; Type: ACL; Schema: -; Owner: -
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM vprpqxebprovvo;
GRANT ALL ON SCHEMA public TO vprpqxebprovvo;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2016-04-12 00:56:06

--
-- PostgreSQL database dump complete
--

